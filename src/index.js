require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

console.log("🔥 Starting Bot...");

// ===== CLIENT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// ===== SAFE COMMAND LOADER =====
const commandsPath = path.join(__dirname, "commands");

function loadCommands(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    try {
      // FOLDER → RECURSE
      if (fs.statSync(filePath).isDirectory()) {
        loadCommands(filePath);
        continue;
      }

      // ONLY JS FILES
      if (!file.endsWith(".js")) continue;

      // CLEAR CACHE (for reload support)
      delete require.cache[require.resolve(filePath)];

      const command = require(filePath);

      // VALIDATION
      if (!command.data || !command.execute) {
        console.log(`⚠️ Skipped invalid: ${file}`);
        continue;
      }

      // DUPLICATE PROTECTION
      if (client.commands.has(command.data.name)) {
        console.log(`⚠️ Duplicate command: ${command.data.name}`);
        continue;
      }

      client.commands.set(command.data.name, command);

      console.log(`✅ Loaded: ${command.data.name}`);

    } catch (err) {
      console.error(`❌ Error loading ${file}:`, err.message);
    }
  }
}

// ===== EVENT LOADER =====
const eventsPath = path.join(__dirname, "events");

function loadEvents() {
  if (!fs.existsSync(eventsPath)) return;

  const files = fs.readdirSync(eventsPath);

  for (const file of files) {
    if (!file.endsWith(".js")) continue;

    const filePath = path.join(eventsPath, file);

    try {
      delete require.cache[require.resolve(filePath)];

      const event = require(filePath);

      if (!event.name || !event.execute) {
        console.log(`⚠️ Invalid event: ${file}`);
        continue;
      }

      if (event.once) {
        client.once(event.name, (...args) =>
          event.execute(...args, client)
        );
      } else {
        client.on(event.name, (...args) =>
          event.execute(...args, client)
        );
      }

      console.log(`📌 Loaded event: ${event.name}`);

    } catch (err) {
      console.error(`❌ Event error (${file}):`, err.message);
    }
  }
}

// ===== INTERACTION HANDLER =====
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`❌ Command error:`, err);

    if (interaction.replied || interaction.deferred) {
      interaction.followUp({ content: "❌ Error executing command", ephemeral: true });
    } else {
      interaction.reply({ content: "❌ Error executing command", ephemeral: true });
    }
  }
});

// ===== READY =====
client.once("ready", () => {
  console.log(`🚀 Logged in as ${client.user.tag}`);
  console.log(`📦 Commands loaded: ${client.commands.size}`);
});

// ===== GLOBAL ERROR HANDLING =====
process.on("unhandledRejection", err => {
  console.error("❌ Unhandled Rejection:", err);
});

process.on("uncaughtException", err => {
  console.error("❌ Uncaught Exception:", err);
});

// ===== START =====
loadCommands(commandsPath);
loadEvents();

// ===== LOGIN =====
if (!process.env.TOKEN) {
  console.error("❌ TOKEN missing in .env");
  process.exit(1);
}

client.login(process.env.TOKEN);

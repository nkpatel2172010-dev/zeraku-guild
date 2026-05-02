require("dotenv").config();
const fs = require("fs");
const path = require("path");
const {
  Client,
  Collection,
  GatewayIntentBits,
  REST,
  Routes
} = require("discord.js");

console.log("🔥 Starting Bot (DEV MODE)...");

// ===== CLIENT =====
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

// ===== COMMAND LOADER =====
const commandsPath = path.join(__dirname, "commands");

function loadCommands(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    try {
      if (fs.statSync(filePath).isDirectory()) {
        loadCommands(filePath);
        continue;
      }

      if (!file.endsWith(".js")) continue;

      delete require.cache[require.resolve(filePath)];
      const command = require(filePath);

      if (!command.data || !command.execute) {
        console.log(`⚠️ Skipped: ${file}`);
        continue;
      }

      client.commands.set(command.data.name, command);
      console.log(`✅ Loaded: ${command.data.name}`);

    } catch (err) {
      console.error(`❌ ${file}:`, err.message);
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

      console.log(`📌 Event: ${event.name}`);

    } catch (err) {
      console.error(`❌ Event ${file}:`, err.message);
    }
  }
}

// ===== GUILD DEPLOY =====
async function deployCommands() {
  if (!process.env.CLIENT_ID || !process.env.GUILD_ID) {
    console.log("❌ CLIENT_ID or GUILD_ID missing");
    return;
  }

  const commands = client.commands.map(cmd => cmd.data.toJSON());
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    console.log("⚡ Deploying GUILD commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Commands deployed instantly!");

  } catch (err) {
    console.error("❌ Deploy error:", err);
  }
}

// ===== INTERACTION =====
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error("❌ Command error:", err);

    const msg = { content: "❌ Error executing command", ephemeral: true };

    if (interaction.replied || interaction.deferred) {
      interaction.followUp(msg);
    } else {
      interaction.reply(msg);
    }
  }
});

// ===== READY =====
client.once("ready", async () => {
  console.log(`🚀 Logged in as ${client.user.tag}`);
  console.log(`📦 Commands: ${client.commands.size}`);

  await deployCommands(); // ⚡ instant deploy
});

// ===== ERRORS =====
process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

// ===== START =====
loadCommands(commandsPath);
loadEvents();

// ===== LOGIN =====
if (!process.env.TOKEN) {
  console.error("❌ TOKEN missing");
  process.exit(1);
}

client.login(process.env.TOKEN);

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { REST, Routes } = require("discord.js");

const commands = [];

// ===== LOAD COMMANDS =====
const commandsPath = path.join(__dirname, "commands");

function loadCommands(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      loadCommands(filePath);
      continue;
    }

    if (!file.endsWith(".js")) continue;

    try {
      const command = require(filePath);

      if (command.data) {
        commands.push(command.data.toJSON());
        console.log(`✅ ${command.data.name}`);
      } else {
        console.log(`⚠️ Skipped: ${file}`);
      }

    } catch (err) {
      console.error(`❌ ${file}:`, err.message);
    }
  }
}

loadCommands(commandsPath);

// ===== DISCORD API =====
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// ===== DEPLOY GLOBAL =====
(async () => {
  try {
    console.log("🌍 Deploying GLOBAL commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID), // ✅ GLOBAL
      { body: commands }
    );

    console.log("✅ Global commands deployed!");

  } catch (error) {
    console.error("❌ Deploy error:", error);
  }
})();

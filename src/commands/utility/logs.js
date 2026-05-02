const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
    .setDescription("Check logs system"),

  async execute(interaction) {
    await interaction.reply("📄 Logs command working!");
  }
};

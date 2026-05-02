const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show help menu"),

  async execute(interaction) {
    await interaction.reply("📖 Help system coming soon");
  }
};

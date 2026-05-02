const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test123")
    .setDescription("test command"),

  async execute(interaction) {
    await interaction.reply("Working!");
  }
};

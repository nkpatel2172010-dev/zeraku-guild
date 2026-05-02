const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Bot information"),

  async execute(interaction) {
    await interaction.reply(`🤖 Bot: ${interaction.client.user.tag}`);
  }
};

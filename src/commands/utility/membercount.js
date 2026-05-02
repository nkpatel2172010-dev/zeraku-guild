const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Show server member count"),

  async execute(interaction) {
    await interaction.reply(`👥 Members: ${interaction.guild.memberCount}`);
  }
};

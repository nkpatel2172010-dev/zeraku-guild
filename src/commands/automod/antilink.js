const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antilink")
    .setDescription("Toggle anti link")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const s = getSettings(interaction.guild.id);
    settings.antiLink = !settings.antiLink;

    await interaction.reply(`AntiLink: ${settings.antiLink}`);
  }
};

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automodoff")
    .setDescription("Disable automod")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const settings = getSettings(interaction.guild.id);
    settings.enabled = false;

    await interaction.reply("❌ AutoMod disabled");
  }
};

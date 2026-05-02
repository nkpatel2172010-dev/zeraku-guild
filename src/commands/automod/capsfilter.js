const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("capsfilter")
    .setDescription("Toggle caps filter")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const s = getSettings(interaction.guild.id);
    s.caps = !s.caps;

    await interaction.reply(`Caps Filter: ${s.caps}`);
  }
};

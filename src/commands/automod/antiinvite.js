const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antiinvite")
    .setDescription("Toggle anti invite")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const s = await getSettings(interaction.guild.id);

    s.antiInvite = !s.antiInvite;
    await s.save();

    await interaction.reply(`AntiInvite is now: ${s.antiInvite ? "ON" : "OFF"}`);
  }
};

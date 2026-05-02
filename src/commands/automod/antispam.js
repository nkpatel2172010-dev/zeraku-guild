const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antispam")
    .setDescription("Toggle anti spam")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const s = await getSettings(interaction.guild.id);

    s.antiSpam = !s.antiSpam;
    await s.save();

    await interaction.reply(`AntiSpam is now: ${s.antiSpam ? "ON" : "OFF"}`);
  }
};

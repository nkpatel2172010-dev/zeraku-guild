const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automodon")
    .setDescription("Enable AutoMod")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const s = await getSettings(interaction.guild.id);

    s.enabled = true;
    await s.save();

    await interaction.reply("✅ AutoMod enabled");
  }
};

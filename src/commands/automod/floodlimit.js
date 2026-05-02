const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("floodlimit")
    .setDescription("Set spam limit")
    .addIntegerOption(opt =>
      opt.setName("limit").setDescription("Messages").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const limit = interaction.options.getInteger("limit");
    const s = getSettings(interaction.guild.id);

    s.floodLimit = limit;

    await interaction.reply(`Flood limit set to ${limit}`);
  }
};

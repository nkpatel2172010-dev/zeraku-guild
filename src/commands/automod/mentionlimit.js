const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mentionlimit")
    .setDescription("Set mention limit")
    .addIntegerOption(opt =>
      opt.setName("limit").setDescription("Number").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const limit = interaction.options.getInteger("limit");
    const s = getSettings(interaction.guild.id);

    s.mentionLimit = limit;

    await interaction.reply(`Mention limit set to ${limit}`);
  }
};

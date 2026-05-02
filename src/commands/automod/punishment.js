const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("punishment")
    .setDescription("Set punishment")
    .addStringOption(opt =>
      opt.setName("type")
        .setDescription("delete / warn")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const type = interaction.options.getString("type");
    const s = getSettings(interaction.guild.id);

    s.punishment = type;

    await interaction.reply(`Punishment set to ${type}`);
  }
};

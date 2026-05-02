const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removebadword")
    .setDescription("Remove bad word")
    .addStringOption(opt =>
      opt.setName("word").setDescription("Word").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const word = interaction.options.getString("word").toLowerCase();
    const settings = getSettings(interaction.guild.id);

    settings.badWords = settings.badWords.filter(w => w !== word);

    await interaction.reply(`❌ Removed: ${word}`);
  }
};

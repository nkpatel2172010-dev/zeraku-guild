const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addbadword")
    .setDescription("Add a bad word")
    .addStringOption(option =>
      option.setName("word")
        .setDescription("Word to block")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const word = interaction.options.getString("word").toLowerCase();
    const s = await getSettings(interaction.guild.id);

    if (!s.badWords.includes(word)) {
      s.badWords.push(word);
      await s.save();
    }

    await interaction.reply(`✅ Added bad word: ${word}`);
  }
};

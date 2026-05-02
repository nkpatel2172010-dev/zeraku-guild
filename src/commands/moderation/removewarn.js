const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../../models/Warn");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removewarn")
    .setDescription("Remove a specific warn")
    .addIntegerOption(opt =>
      opt.setName("case")
        .setDescription("Case ID")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const caseId = interaction.options.getInteger("case");

    const warn = await Warn.findOne({ caseId });

    if (!warn) {
      return interaction.reply({ content: "❌ Case not found", ephemeral: true });
    }

    await Warn.deleteOne({ caseId });

    interaction.reply(`✅ Removed warn case #${caseId}`);
  }
};

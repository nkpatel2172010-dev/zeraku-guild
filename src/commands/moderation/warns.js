const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../../models/Warn");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Check warnings")
    .addUserOption(opt => opt.setName("user").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    const warns = await Warn.find({ userId: user.id });

    if (!warns.length) {
      return interaction.reply("No warnings found.");
    }

    const list = warns.map(w => `#${w.caseId} → ${w.reason}`).join("\n");

    interaction.reply(`Warnings for ${user.tag}:\n${list}`);
  }
};

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../../models/Warn");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("history")
    .setDescription("Full case history of a user")
    .addUserOption(opt => opt.setName("user").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    const warns = await Warn.find({ userId: user.id }).sort({ caseId: -1 });

    if (!warns.length) {
      return interaction.reply("No history found.");
    }

    const text = warns.map(w =>
      `#${w.caseId} | ${w.reason} | <@${w.moderatorId}>`
    ).join("\n");

    interaction.reply({
      content: `📜 History of ${user.tag}:\n${text}`,
      ephemeral: true
    });
  }
};

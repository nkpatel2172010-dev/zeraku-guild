const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../../models/Warn");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetwarns")
    .setDescription("Reset all warns of a user")
    .addUserOption(opt => opt.setName("user").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await Warn.deleteMany({ userId: user.id });

    interaction.reply(`♻️ All warns cleared for ${user.tag}`);
  }
};

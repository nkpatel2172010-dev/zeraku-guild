const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member")
    .addUserOption(opt => opt.setName("user").setRequired(true))
    .addIntegerOption(opt => opt.setName("seconds").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const seconds = interaction.options.getInteger("seconds");

    await member.timeout(seconds * 1000);

    interaction.reply(`⏳ Timed out ${member.user.tag}`);
  }
};

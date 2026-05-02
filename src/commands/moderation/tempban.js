const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tempban")
    .setDescription("Temporary ban")
    .addUserOption(opt => opt.setName("user").setRequired(true))
    .addIntegerOption(opt => opt.setName("seconds").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const seconds = interaction.options.getInteger("seconds");

    await interaction.guild.members.ban(user.id);

    interaction.reply(`⏳ Temp banned ${user.tag}`);

    setTimeout(async () => {
      try {
        await interaction.guild.members.unban(user.id);
      } catch {}
    }, seconds * 1000);
  }
};

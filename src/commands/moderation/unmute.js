const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmute a user")
    .addUserOption(option =>
      option.setName("user").setDescription("User to unmute").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);

    const muteRole = interaction.guild.roles.cache.find(r => r.name === "Muted");

    if (!muteRole) {
      return interaction.reply({ content: "❌ No mute role found", ephemeral: true });
    }

    await member.roles.remove(muteRole);

    await interaction.reply(`🔊 Unmuted ${user.tag}`);
  }
};

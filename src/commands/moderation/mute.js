const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a user")
    .addUserOption(option =>
      option.setName("user").setDescription("User to mute").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: "❌ User not found", ephemeral: true });
    }

    // Find or create mute role
    let muteRole = interaction.guild.roles.cache.find(r => r.name === "Muted");

    if (!muteRole) {
      muteRole = await interaction.guild.roles.create({
        name: "Muted",
        permissions: []
      });

      // Deny send messages in all channels
      interaction.guild.channels.cache.forEach(async channel => {
        await channel.permissionOverwrites.create(muteRole, {
          SendMessages: false,
          Speak: false
        });
      });
    }

    await member.roles.add(muteRole);

    await interaction.reply(`🔇 Muted ${user.tag}`);
  }
};

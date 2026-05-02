const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Get bot invite link"),

  async execute(interaction) {
    const inviteLink = "https://discord.com/oauth2/authorize?client_id=1494176375916068916&permissions=8&integration_type=0&scope=bot+applications.commands";

    await interaction.reply({
      content: `🔗 Invite me here:\n${inviteLink}`,
      ephemeral: true
    });
  }
};

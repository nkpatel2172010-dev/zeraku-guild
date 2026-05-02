const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Whitelist = require("../../models/Whitelist");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("whitelistadd")
    .setDescription("Whitelist a user")
    .addUserOption(opt => opt.setName("user").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    await Whitelist.create({ userId: user.id });

    interaction.reply(`✅ ${user.tag} whitelisted`);
  }
};

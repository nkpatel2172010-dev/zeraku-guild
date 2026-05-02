const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resetautomod")
    .setDescription("Reset automod settings")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const s = getSettings(interaction.guild.id);

    Object.assign(s, {
      enabled: false,
      badWords: [],
      antiLink: false,
      antiInvite: false,
      caps: false,
      mentionLimit: 5,
      floodLimit: 5,
      whitelist: [],
      blacklist: [],
      punishment: "delete"
    });

    await interaction.reply("AutoMod reset done.");
  }
};

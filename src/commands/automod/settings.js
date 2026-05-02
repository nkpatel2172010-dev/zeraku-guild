const { SlashCommandBuilder } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automodsettings")
    .setDescription("View automod settings"),

  async execute(interaction) {
    const s = getSettings(interaction.guild.id);

    await interaction.reply(`
AutoMod: ${s.enabled}
AntiLink: ${s.antiLink}
AntiInvite: ${s.antiInvite}
Caps: ${s.caps}
BadWords: ${s.badWords.length}
`);
  }
};

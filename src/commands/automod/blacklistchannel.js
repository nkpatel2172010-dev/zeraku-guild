const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getSettings } = require("../../systems/automodData");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blacklistchannel")
    .setDescription("Blacklist channel")
    .addChannelOption(opt =>
      opt.setName("channel").setDescription("Channel").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const s = getSettings(interaction.guild.id);

    s.blacklist.push(channel.id);

    await interaction.reply(`Blacklisted: ${channel}`);
  }
};

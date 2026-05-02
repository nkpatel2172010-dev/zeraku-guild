const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const System = require("../../models/System");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setlog")
    .setDescription("Set mod log channel")
    .addChannelOption(opt => opt.setName("channel").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");

    let data = await System.findOne();
    if (!data) data = await System.create({});

    data.modLogChannel = channel.id;
    await data.save();

    interaction.reply(`✅ Log channel set to ${channel}`);
  }
};

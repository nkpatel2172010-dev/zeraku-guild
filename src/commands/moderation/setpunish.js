const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const System = require("../../models/System");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setpunish")
    .setDescription("Set auto punish")
    .addStringOption(opt =>
      opt.setName("action")
        .setRequired(true)
        .addChoices(
          { name: "timeout", value: "timeout" },
          { name: "kick", value: "kick" },
          { name: "ban", value: "ban" }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const action = interaction.options.getString("action");

    let data = await System.findOne();
    if (!data) data = await System.create({});

    data.autoPunish.action = action;
    await data.save();

    interaction.reply(`✅ Auto punish set to ${action}`);
  }
};

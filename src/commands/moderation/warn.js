const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../../models/Warn");
const { getCase } = require("../../systems/caseSystem");
const { logMod } = require("../../systems/modLogger");
const { checkAutoPunish } = require("../../systems/autoPunish");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user")
    .addUserOption(opt =>
      opt.setName("user")
        .setDescription("User to warn")
        .setRequired(true)
    )
    .addStringOption(opt =>
      opt.setName("reason")
        .setDescription("Reason for warning")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const reason = interaction.options.getString("reason") || "No reason";

    const member = interaction.guild.members.cache.get(user.id);

    // ❌ Safety checks
    if (!member) {
      return interaction.reply({ content: "User not found", ephemeral: true });
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({ content: "You can't warn yourself", ephemeral: true });
    }

    if (!member.moderatable) {
      return    const member = interaction.guild.members.cache.get(user.id);
    if (member) {
      await checkAutoPunish(member);
    }
  }
};
    // 🔥 SAVE WARN FIRST
    await Warn.create({
      userId: user.id,
      moderatorId: interaction.user.id,
      reason,
      caseId
    });

    const msg = `⚠️ Case #${caseId} | ${user.tag}\nReason: ${reason}`;

await interaction.reply({ content: msg });

// 🔥 NEW EMBED LOG
await logMod(
  interaction.client,
  "User Warned",
  `User: ${user.tag}\nModerator: ${interaction.user.tag}\nReason: ${reason}\nCase: #${caseId}`,
  0xffcc00
);
    await logMod(interaction.client, msg);

    // 🔥 ADD THIS AT THE END (VERY IMPORTANT)
    const member = interaction.guild.members.cache.get(user.id);
    if (member) {
      await checkAutoPunish(member);
    }
  }
};
    const caseId = await getCase();

    await Warn.create({
      userId: user.id,
      moderatorId: interaction.user.id,
      reason,
      caseId
    });

    const msg = `⚠️ Case #${caseId} | ${user.tag} warned\nReason: ${reason}`;

    await interaction.reply(msg);

    await logMod(interaction.client, msg);
  }
};

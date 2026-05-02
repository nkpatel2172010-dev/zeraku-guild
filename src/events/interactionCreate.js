const Warn = require("../models/Warn");
const { getCase } = require("../systems/caseSystem");
const { logMod } = require("../systems/modLogger");

let selectedUser = new Map();

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {

    // ===============================
    // 🔥 SLASH COMMANDS
    // ===============================
    if (interaction.isChatInputCommand()) {
      const cmd = client.commands.get(interaction.commandName);
      if (!cmd) return;

      try {
        await cmd.execute(interaction, client);
      } catch (e) {
        console.log(e);
      }
    }

    // ===============================
    // 🔥 USER SELECT
    // ===============================
    if (interaction.isUserSelectMenu()) {
      selectedUser.set(interaction.user.id, interaction.values[0]);

      return interaction.reply({
        content: "✅ User selected",
        ephemeral: true
      });
    }

    // ===============================
    // 🔥 ACTION SELECT
    // ===============================
    if (interaction.isStringSelectMenu()) {

      if (interaction.customId !== "select_action") return;

      const userId = selectedUser.get(interaction.user.id);
      if (!userId) {
        return interaction.reply({
          content: "❌ Select user first",
          ephemeral: true
        });
      }

      const member = interaction.guild.members.cache.get(userId);
      if (!member) return;

      const action = interaction.values[0];

      try {

        // 🔥 WARN
        if (action === "warn") {
          const caseId = await getCase();

          await Warn.create({
            userId: member.id,
            moderatorId: interaction.user.id,
            reason: "Panel warn",
            caseId
          });

          await interaction.reply(`⚠️ Warned ${member.user.tag}`);

          await logMod(
            interaction.client,
            "Warn",
            `${member.user.tag} warned via panel\nCase #${caseId}`
          );
        }

        // 🔥 KICK
        if (action === "kick") {
          await member.kick();
          await interaction.reply(`👢 Kicked ${member.user.tag}`);
        }

        // 🔥 BAN
        if (action === "ban") {
          await member.ban();
          await interaction.reply(`🔨 Banned ${member.user.tag}`);
        }

        // 🔥 MUTE
        if (action === "mute") {
          await member.timeout(60000);
          await interaction.reply(`🔇 Muted ${member.user.tag}`);
        }

      } catch {
        interaction.reply({ content: "❌ Failed", ephemeral: true });
      }
    }
  }
};

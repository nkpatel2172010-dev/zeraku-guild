const { AuditLogEvent } = require("discord.js");
const { addAction, isWhitelisted } = require("../systems/antinuke");

module.exports = {
  name: "guildAuditLogEntryCreate",

  async execute(entry) {
    const { action, executor, guild } = entry;

    if (!executor || executor.bot) return;
    if (await isWhitelisted(executor.id)) return;

    const member = guild.members.cache.get(executor.id);
    if (!member) return;

    // BAN SPAM
    if (action === AuditLogEvent.MemberBanAdd) {
      if (addAction(executor.id, "ban") >= 3 && member.bannable) {
        await member.ban({ reason: "AntiNuke Ban Spam" });
      }
    }

    // KICK SPAM
    if (action === AuditLogEvent.MemberKick) {
      if (addAction(executor.id, "kick") >= 3 && member.bannable) {
        await member.ban({ reason: "AntiNuke Kick Spam" });
      }
    }

    // CHANNEL DELETE
    if (action === AuditLogEvent.ChannelDelete) {
      if (addAction(executor.id, "channel") >= 2 && member.bannable) {
        await member.ban({ reason: "AntiNuke Channel Delete" });
      }
    }

    // ROLE DELETE
    if (action === AuditLogEvent.RoleDelete) {
      if (addAction(executor.id, "role") >= 2 && member.bannable) {
        await member.ban({ reason: "AntiNuke Role Delete" });
      }
    }
  }
};};

const AutoMod = require("../models/AutoMod");

async function getSettings(guildId) {
  let data = await AutoMod.findOne({ guildId });

  if (!data) {
    data = await AutoMod.create({
      guildId,

      enabled: true, // 🔥 ALWAYS ON

      antiLink: true,
      antiInvite: true,
      antiSpam: true,
      caps: true,

      badWords: ["fuck", "shit", "bitch"],

      mentionLimit: 5,
      floodLimit: 5,

      whitelist: [],
      blacklist: [],

      bypassRoles: [],

      punishment: "timeout",
      logChannel: null
    });
  }

  return

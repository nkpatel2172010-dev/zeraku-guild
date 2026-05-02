const mongoose = require("mongoose");

const autoModSchema = new mongoose.Schema({
  guildId: String,

  enabled: { type: Boolean, default: false },

  badWords: { type: Array, default: [] },

  antiLink: { type: Boolean, default: false },
  antiInvite: { type: Boolean, default: false },
  antiSpam: { type: Boolean, default: false },
  caps: { type: Boolean, default: false },

  mentionLimit: { type: Number, default: 5 },
  floodLimit: { type: Number, default: 5 },

  whitelist: { type: Array, default: [] },
  blacklist: { type: Array, default: [] },

  bypassRoles: { type: Array, default: [] },

  punishment: { type: String, default: "delete" },

  logChannel: { type: String, default: null }
});

module.exports = mongoose.model("AutoMod", autoModSchema);

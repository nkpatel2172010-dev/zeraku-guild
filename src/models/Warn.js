const mongoose = require("mongoose");

const warnSchema = new mongoose.Schema({
  userId: String,
  moderatorId: String,
  reason: String,
  caseId: Number,
  timestamp: { type: Date, default: Date.now },
  expiresAt: Date // 🔥 NEW
});

module.exports = mongoose.model("Warn", warnSchema);

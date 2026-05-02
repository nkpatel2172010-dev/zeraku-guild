const mongoose = require("mongoose");

const systemSchema = new mongoose.Schema({
  caseCount: { type: Number, default: 0 },
  modLogChannel: { type: String, default: null },

  autoPunish: {
    enabled: { type: Boolean, default: true },
    limit: { type: Number, default: 3 },
    action: { type: String, default: "timeout" } // timeout | kick | ban
  }
});

module.exports = mongoose.model("System", systemSchema);

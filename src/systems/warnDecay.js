const Warn = require("../models/Warn");

async function startDecaySystem() {
  setInterval(async () => {
    try {
      const now = new Date();

      const expired = await Warn.deleteMany({
        expiresAt: { $lte: now }
      });

      if (expired.deletedCount > 0) {
        console.log(`🧹 Removed ${expired.deletedCount} expired warns`);
      }

    } catch (err) {
      console.log("Decay error:", err);
    }
  }, 60000); // check every 1 min
}

module.exports = { startDecaySystem };

const Warn = require("../models/Warn");
const System = require("../models/System");

async function checkAutoPunish(member) {
  const system = await System.findOne();
  if (!system || !system.autoPunish.enabled) return;

  const warns = await Warn.find({ userId: member.id });

  if (warns.length < system.autoPunish.limit) return;

  const action = system.autoPunish.action;

  try {
    if (action === "timeout") {
      await member.timeout(60000);
    }

    if (action === "kick") {
      await member.kick();
    }

    if (action === "ban") {
      await member.ban();
    }

  } catch (err) {
    console.log("Auto punish error:", err);
  }
}

module.exports = { checkAutoPunish };

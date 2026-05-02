const limits = new Map();
const Whitelist = require("../models/Whitelist");

function addAction(userId, type) {
  const key = `${userId}_${type}`;
  const now = Date.now();

  if (!limits.has(key)) limits.set(key, []);

  const arr = limits.get(key);
  arr.push(now);

  const filtered = arr.filter(t => now - t < 10000);
  limits.set(key, filtered);

  return filtered.length;
}

async function isWhitelisted(userId) {
  const data = await Whitelist.findOne({ userId });
  return !!data;
}

module.exports = { addAction, isWhitelisted };

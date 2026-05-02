const { EmbedBuilder } = require("discord.js");
const System = require("../models/System");

async function logMod(client, title, description, color = 0xff0000) {
  const data = await System.findOne();
  if (!data || !data.modLogChannel) return;

  const channel = client.channels.cache.get(data.modLogChannel);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();

  channel.send({ embeds: [embed] });
}

module.exports = { logMod };

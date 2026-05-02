const {
  SlashCommandBuilder,
  ActionRowBuilder,
  UserSelectMenuBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Advanced moderation panel"),

  async execute(interaction) {

    const userMenu = new UserSelectMenuBuilder()
      .setCustomId("select_user")
      .setPlaceholder("Select a user");

    const actionMenu = new StringSelectMenuBuilder()
      .setCustomId("select_action")
      .setPlaceholder("Select action")
      .addOptions([
        { label: "Warn", value: "warn

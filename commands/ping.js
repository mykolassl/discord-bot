const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pogger'),
    exec: async function execute(interaction) {
        await interaction.reply('POOOOOOOOOOOOOOOOOOOOOg')
    }
};
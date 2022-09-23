const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow } = require('discord.js');
const fs = require('node:fs');
const { cards } = require('../blackjackCards.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blackjack')
        .setDescription('Play a game of blackjack')
        .addNumberOption((option) => 
            option
                .setName('amount')
                .setDescription('Choose an amount you want to bet.')
                .setRequired(true)
        ),
    exec: async function (interaction) {

        console.log(games)
        const blackjackTable = new EmbedBuilder()
            .setAuthor(
                { 
                    name: interaction.user.username, 
                    iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}.png` 
                })
            .addFields(
                { 
                    name: '**Your hand**', 
                    value: `${cards[0].code}\n\nHand value: ${cards[0].value}`, 
                    inline: true
                },
                { 
                    name: '**Dealer hand**', 
                    value: `${cards[0].code}\n\nHand value: ${cards[0].value}`, 
                    inline: true
                })
            .setTimestamp();
        
        const buttonHit = new ButtonBuilder()
            .setCustomId('hit')
            .setLabel('Hit')
            .setStyle(ButtonStyle.Success);

        const buttonStand = new ButtonBuilder()
            .setCustomId('stand')
            .setLabel('Stand')
            .setStyle(ButtonStyle.Danger);

        const actionButtons = new ActionRowBuilder().addComponents(buttonHit, buttonStand);

        await interaction.reply({ embeds: [blackjackTable], components: [actionButtons] })
    }
};
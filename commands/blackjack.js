const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
    exec: async function execute(interaction) {
        const blackjackTable = new EmbedBuilder()
            .setAuthor({ name: interaction.user.username })
            .addFields(
                {name: '**Your hand**', value: `${cards[0].code}\n\nHand value: ${cards[0].value}`, inline: true},
                {name: '**Dealer hand**', value: `${cards[0].code}\n\nHand value: ${cards[0].value}`, inline: true},
            )
            .setTimestamp();

        await interaction.reply({ embeds: [blackjackTable] })
    }
};
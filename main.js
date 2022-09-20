require('dotenv').config();
const { Client, GatewayIntentBits, Routes, Collection } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Load commands
client.commands = new Collection();
const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter((file) => file.endsWith('.js'));

for(const file of commandFiles) {
    const cmd = require(path.join(__dirname, 'commands', file));

    client.commands.set(cmd.data.name, cmd)
    commands.push(cmd.data.toJSON());
}

// Register commands
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.BOT_ID, process.env.DEV_SRV_ID), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) return;

    try {
        await command.exec(interaction);
    } catch(err) {
        console.error(err);
    }
});
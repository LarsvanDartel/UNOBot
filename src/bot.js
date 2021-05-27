require('dotenv').config();
const { token } = require('../config');
const { Client } = require('discord.js');
const client = new Client();
require('discord-buttons')(client);
const StateManager = require('./utils/StateManager');
const { registerCommands, registerEvents } = require('./utils/register');

(async () => {
    client.commands = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(token);
})();




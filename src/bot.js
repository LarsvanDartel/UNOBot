require('dotenv').config();
const { token } = require('../config');
const { Client } = require('discord.js');
const client = new Client();
const StateManager = require('./utils/StateManager');
const { registerCommands, registerEvents } = require('./utils/register');


// client.on('guildCreate', (guild) => {
//     try {
//         connection.query(
//             `INSERT INTO Guilds VALUES ('${guild.id}', '${guild.name.replace('\'', '\'\'')}', '${guild.memberCount}', '${guild.ownerID}', '${guild.createdAt.toISOString().slice(0, 19).replace('T', ' ')}');`
//         )
//         connection.query(
//             `INSERT INTO GuildSettings (guildId) VALUES ('${guild.id}');`
//         )
//     } catch(err) {
//         console.log(err)
//     }
// });


(async () => {
    StateManager.on('ready',  () => {
        console.log('hello');
    })
    client.commands = new Map();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(token);
})();




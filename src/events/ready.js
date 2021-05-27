const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');


module.exports = class ReadyEvent extends BaseEvent {
    constructor(){
        super('ready')
        this.connection = StateManager.connection;
    }

    async run(client, message){
        console.log(`Logged in as ${client.user.tag}!`);
        client.guilds.cache.forEach((guild) => {
            this.connection.query(
                `SELECT prefix FROM GuildSettings WHERE guildId = '${guild.id}'`
            ).then(result => {
                const guildId = guild.id;
                const prefix = result[0][0].prefix;
                StateManager.emit('prefixFetched', guildId, prefix);
            }).catch(err => console.log(err))
        })
    }
}
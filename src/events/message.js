const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');
const guildPrefixes = new Map();
StateManager.on('prefixFetched', (guildId, prefix) =>{
    guildPrefixes.set(guildId, prefix);
});

module.exports = class MessageEvent extends BaseEvent {
    constructor(){
        super('message')
    }

    async run(client, message){
        if(message.author.bot) return;
        const { guild, channel } = message;
        const prefix = guildPrefixes.get(guild.id);
        //channel.send(`This guild's prefix is \`${prefix}\`.`);
    }
}

const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');
const guildPrefixes = new Map();
StateManager.on('prefixFetched', (guildId, prefix) =>{
    guildPrefixes.set(guildId, prefix);
});
StateManager.on('prefixUpdated', (guildId, prefix) =>{
    guildPrefixes.set(guildId, prefix);
});
module.exports = class MessageEvent extends BaseEvent {
    constructor(){
        super('message')
    }
    /**
     * @param {Client} client - The bot's client
     * @param {Message} message - The recieved message
     */
    async run(client, message){
        if(message.author.bot) return;
        
        const { content, guild, channel, member, author } = message;
        const prefix = guildPrefixes.get(guild.id);
        
        if(!content.startsWith(prefix)) return;
        
        const [cmd, ...args] = content.slice(prefix.length).split(/\s+/);
        if(!cmd) return;
        let command = client.commands.get(cmd.toLowerCase());

        if(!command) {
            let found = false;
            client.commands.forEach((value, key) => {
                if(value.aliases.includes(cmd.toLowerCase())) {
                    found = true;
                    command = value;
                }
            })
            if(!found){
                channel.send(`⚠️Unknown command \`${cmd}\`.`);
                return;
            }
        }

        if(args.length < command.minArgs || (command.maxArgs !== 0 && args.length > command.maxArgs)){
            channel.send(`⚠️Incorrect usage, use the command as described:\n${command.usage}`);
            return;
        }

        for(const permission of command.permissions){
            if(!member.permissions.has(permission)){
                channel.send(`⚠️Invalid permissions, you don't have the correct permissions to execute this command.`)
                return;
            }
        }

        for(const role of command.roles){
            if(!member.roles.cache.find(r => r.name.toLowerCase() == role)){
                channel.send(`⚠️Invalid permissions, you don't have the correct role to execute this command.`)
                return;
            }
        }

        command.run(client, message, args);

    }
}

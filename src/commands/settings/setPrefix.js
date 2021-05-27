const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
const { Message, Client } = require('discord.js');
const guildPrefixes = new Map();
StateManager.on('prefixFetched', (guildId, prefix) =>{
    guildPrefixes.set(guildId, prefix);
});
StateManager.on('prefixUpdated', (guildId, prefix) =>{
    guildPrefixes.set(guildId, prefix);
});
module.exports = class SetPrefixCommand extends BaseCommand {
    constructor(){
        super({
            name: 'setPrefix',
            category: 'settings',
            aliases: ['changePrefix', 'prefix'],
            description: 'Changes the bot\'s prefix for this guild.',
            usage: 'setPrefix [prefix]',
            minArgs: 0,
            maxArgs: 1,
            permissions: ['ADMINISTRATOR']
        })

        this.connection = StateManager.connection;
    }
    /**
     * @param {Client} client - The bot's client
     * @param {Message} message - The message that executed the command
     * @param {[String]} args - the arguments that were parsed from the message
     */
    async run(client, message, args) {
        const { guild, channel } = message;
        const newPrefix = args[0];
        if(!newPrefix){
            channel.send(`The current prefix is \`${guildPrefixes.get(guild.id)}\`.\nTo change the prefix, use \`${guildPrefixes.get(guild.id)}${this.usage}\``)
            return;
        }
        try {
            await this.connection.query(
                `UPDATE GuildSettings SET prefix = '${newPrefix}' WHERE guildId = '${guild.id}';`
            );
            StateManager.emit('prefixUpdated', guild.id, newPrefix);
            channel.send(`✅The prefix was updated to \`${newPrefix}\``);
        } catch(err) {
            console.log(err);
            channel.send(`🚫Failed to update the prefix to \`${newPrefix}\`\nIf this issue keeps happening, please contact the bot's owner.`);
        }
    }
}


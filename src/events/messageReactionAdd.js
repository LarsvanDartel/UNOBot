const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');
const { ownerId, ticketChannelId } = require('../../config');
const { Client, MessageReaction, User } = require('discord.js');

module.exports = class MessageReactionAddEvent extends BaseEvent {
    constructor(){
        super('messageReactionAdd')
        this.connection = StateManager.connection;
    }
    /**
     * 
     * @param {Client} client - The bot's client
     * @param {MessageReaction} reaction - The reaction
     * @param {User} user - The user that reacted 
     */
    async run(client, reaction, user){
        if(reaction.message.channel.id === ticketChannelId && reaction.emoji.name == '✅' && user.id == ownerId){
            console.log(`${user.tag} accepted ticket from ${reaction.message.embeds[0].title}: ${reaction.message.embeds[0].description}`);
            reaction.message.delete();
        }
    }
}
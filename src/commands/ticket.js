const BaseCommand = require('../utils/structures/BaseCommand');
const { Message, Client, MessageEmbed } = require('discord.js');
const { ticketChannelId, ownerId } = require('../../config');
const { MessageButton } = require('discord-buttons');

module.exports = class TicketCommand extends BaseCommand {
    constructor(){
        super({
            name: 'ticket',
            category: 'support',
            aliases: ['support'],
            description: 'Creates a support ticket for the bot owner to review.',
            usage: 'ticket [Ticket content]',
            minArgs: 0,
            maxArgs: 0
        })
    }
    
    /**
     * @param {Client} client - The bot's client
     * @param {Message} message - The message that executed the command
     * @param {[String]} args - the arguments that were parsed from the message
     */
    async run(client, message, args) {
        const { channel, author } = message;
        const ticketChannel = client.channels.cache.get(ticketChannelId);
        const ticket = new MessageEmbed().setColor(16312092).setTitle(author.tag).setDescription(args.join(' '));
        const buttonA = new MessageButton().setStyle('green').setLabel('✅Accept').setID('button_accept');
        const buttonD = new MessageButton().setStyle('red').setLabel('⛔Decline').setID('button_decline');
        ticketChannel.send(client.users.cache.get(ownerId),{embed: ticket, buttons: [buttonA, buttonD]});
        channel.send(`${message.author}, your ticket has been sent, expect a reply within 24 hours.`);
    }
}


const BaseEvent = require('../utils/structures/BaseEvent');
const { ownerId, ticketChannelId } = require('../../config');
module.exports = class MessageReactionAddEvent extends BaseEvent {
    constructor(){
        super('clickButton')
    }

    async run(client, button){
        const channel = await button.channel;
        const user = await button.clicker.user;
        if(channel.id === ticketChannelId && user.id == ownerId){
            if(button.id === 'button_accept'){
                console.log(`${user.tag} accepted ticket from ${button.message.embeds[0].title}: ${button.message.embeds[0].description}`);
                await button.message.delete();
            } else if (button.id === 'button_decline'){
                await button.message.delete();
            }
        }
        await button.reply.send('Only the bot owner can accept or decline tickets.', true);
    }
}
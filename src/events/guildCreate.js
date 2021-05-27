const BaseEvent = require('../utils/structures/BaseEvent');
const StateManager = require('../utils/StateManager');


module.exports = class GuildCreateEvent extends BaseEvent {
    constructor(){
        super('guildCreate')
        this.connection = StateManager.connection;
    }

    async run(client, guild){
        try {
            this.connection.query(
                `INSERT INTO Guilds VALUES ('${guild.id}', '${guild.name.replace('\'', '\'\'')}', '${guild.memberCount}', '${guild.ownerID}', '${guild.createdAt.toISOString().slice(0, 19).replace('T', ' ')}');`
            )
            this.connection.query(
                `INSERT INTO GuildSettings (guildId) VALUES ('${guild.id}');`
            )
        } catch(err) {
            console.log(err)
        }
    }
}
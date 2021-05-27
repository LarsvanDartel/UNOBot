
interface CommandOptions {
    name: string;
    category: string;
    aliases?: string[] | string;
    description?: string;
    usage?: string;
    minArgs?: number;
    maxArgs?: number;
    permissions?: PermissionString[] | PermissionString;
    roles?: string[] | string;
}

type PermissionString =
    | 'CREATE_INSTANT_INVITE'
    | 'KICK_MEMBERS'
    | 'BAN_MEMBERS'
    | 'ADMINISTRATOR'
    | 'MANAGE_CHANNELS'
    | 'MANAGE_GUILD'
    | 'ADD_REACTIONS'
    | 'VIEW_AUDIT_LOG'
    | 'PRIORITY_SPEAKER'
    | 'STREAM'
    | 'VIEW_CHANNEL'
    | 'SEND_MESSAGES'
    | 'SEND_TTS_MESSAGES'
    | 'MANAGE_MESSAGES'
    | 'EMBED_LINKS'
    | 'ATTACH_FILES'
    | 'READ_MESSAGE_HISTORY'
    | 'MENTION_EVERYONE'
    | 'USE_EXTERNAL_EMOJIS'
    | 'VIEW_GUILD_INSIGHTS'
    | 'CONNECT'
    | 'SPEAK'
    | 'MUTE_MEMBERS'
    | 'DEAFEN_MEMBERS'
    | 'MOVE_MEMBERS'
    | 'USE_VAD'
    | 'CHANGE_NICKNAME'
    | 'MANAGE_NICKNAMES'
    | 'MANAGE_ROLES'
    | 'MANAGE_WEBHOOKS'
    | 'MANAGE_EMOJIS'
    | 'USE_APPLICATION_COMMANDS'
    | 'REQUEST_TO_SPEAK';

// export class BaseCommand {
//     public constructor(options: CommandOptions) {};
//     public options: CommandOptions;
//     public name: string;
//     public aliases: string[];
//     public description: string;
//     public usage: string;
//     public minArgs: number;
//     public maxArgs: number;
//     public permissions: PermissionString[];
//     public roles: string[];
//     private validateOptions(options: CommandOptions): void {};

// }
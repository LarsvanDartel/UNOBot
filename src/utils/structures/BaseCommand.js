const { DefaultOptions } = require("../constants");
const Util = require("../util");

module.exports = class BaseCommand {
    /**
     * @param {CommandOptions} options - The command's options
     */
    constructor(options) {

        this.options = Util.mergeDefault(DefaultOptions, options);

        this.validateOptions();       

        this.roles = options.roles;
    }
   /**
    * Validates the command options.
    * @param {CommandOptions} [options=this.options] Options to validate
    * @private
    */
    validateOptions(options = this.options){
        if(typeof options.name !== 'string'){
            throw new TypeError('COMMAND_INVALID_OPTIONS', 'name', 'a String');
        } else {
            this.name = options.name.toLowerCase();
        }

        if(typeof options.category !== 'string'){
            throw new TypeError('COMMAND_INVALID_OPTIONS', 'category', 'a String');
        } else {
            this.category = options.category.toLowerCase();
        }

        if(!Array.isArray(options.aliases)){
            options.aliases = [options.aliases];
        } else {
            this.aliases = options.aliases.filter(alias => typeof alias === 'string').map(alias => alias.toLowerCase());
        }

        if(typeof options.description !== 'string'){
            throw new TypeError('COMMAND_INVALID_OPTIONS', 'description', 'a String');
        } else {
            this.description = options.description;
        }

        if(typeof options.usage !== 'string'){
            throw new TypeError('COMMAND_INVALID_OPTIONS', 'usage', 'a String');
        } else {
            this.usage = options.usage;
        }

        if(typeof options.minArgs !== 'number' || isNaN(options.minArgs)){
            throw new TypeError('COMMAND_INVALID_OPTIONS', 'minArgs', 'a Number');
        } else {
            this.minArgs = options.minArgs;
        }

        if(typeof options.maxArgs !== 'number' || isNaN(options.maxArgs)){
            throw new TypeError('COMMAND_INVALID_OPTIONS', 'maxArgs', 'a Number');
        } else {
            this.maxArgs = options.maxArgs;
        }

        if(!Array.isArray(options.permissions)){
            options.permissions = [options.permissions];
        } else {
            this.permissions = options.permissions.filter(per => typeof per === 'string');
        }

        if(!Array.isArray(options.roles)){
            options.roles = [options.roles];
        } else {
            this.roles = options.roles.filter(per => typeof per === 'string');
        }
    }

}
const Discord = require('discord.js');
const cSchema = require('../../model/classroom.js');

module.exports = {
    name: 'uninit',
    run: async function(client, message, args){
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('You don\'t have permissions for that!');
        }
        const cs = await cSchema.findOne({ guildID: message.guild.id });
        if(!cs){
            return message.reply('This server hasn\'t been initialized yet!');
        }
        cs.delete();
        return message.reply('Succesfully deleted your classroom from my database!');
    },
}
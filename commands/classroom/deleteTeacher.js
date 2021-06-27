const Discord = require('discord.js');
const cSchema = require('../../model/classroom.js');

module.exports = {
    name: 'deleteteacher',
    run: async function(client, message, args){
        const cs = await cSchema.findOne({ guildID: message.guild.id });
        if(!args[0]) return message.reply('Which teacher should be deleted?');
        const teacher = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
        if(!teacher) return message.reply('Couldn\'t find that user!');
        const tRoleID = cs.teacherRoleID;
        if(teacher.roles.cache.has(tRoleID) || cs.teachers.includes(teacher.id)) {
            await teacher.roles.remove(tRoleID);
        }
        cs.teachers.remove(teacher.id);
        await cs.save()
        return message.reply(`Removed teacher role from ${teacher.toString()}`);
    },
}
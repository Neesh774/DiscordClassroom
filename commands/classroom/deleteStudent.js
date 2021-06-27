const Discord = require('discord.js');
const cSchema = require('../../model/classroom.js');

module.exports = {
    name: 'deletestudent',
    run: async function(client, message, args){
        const cs = await cSchema.findOne({ guildID: message.guild.id });
        if(!args[0]) return message.reply('Which student should be deleted?');
        const student = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
        if(!student) return message.reply('Couldn\'t find that user!');
        const sRoleID = cs.studentRoleID;
        if(student.roles.cache.has(sRoleID) || cs.students.includes(student.id)) {
            await student.roles.remove(sRoleID);
        }
        cs.students.remove(student.id);
        await cs.save()
        return message.reply(`Removed student role from ${student.toString()}`);
    },
}
const Discord = require('discord.js');
const cSchema = require('../../model/classroom.js');

module.exports = {
    name: 'addteacher',
    run: async function(client, message, args){
        const cs = await cSchema.findOne({ guildID: message.guild.id });
        if(!cs){
            return message.reply('This server hasn\'t been initialized yet!');
        }
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('You don\'t have permissions for that.');
        }
        if(!args[0]) return message.reply('Who\'s the new teacher?');
        const teacher = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
        if(!teacher) return message.reply('Couldn\'t find that user!');
        const tRoleID = cs.teacherRoleID;
        const sRoleID = cs.studentRoleID;
        if(teacher.roles.cache.has(tRoleID) || cs.teachers.includes(teacher.id)) return message.reply('That user is already a teacher!');
        if(teacher.roles.cache.has(sRoleID)){
            await teacher.roles.remove(sRoleID);
        }
        if(cs.students.includes(teacher.id)){
            const index = cs.students.find(element => {element == teacher.id});
            cs.students.splice(index, 1);
            await cs.save();
        }
        await teacher.roles.add(tRoleID);
        cs.teachers.push(teacher.id);
        await cs.save();
        return message.reply(`Gave ${teacher.toString()} the teacher role!`);
    },
}
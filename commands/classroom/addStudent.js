const Discord = require('discord.js');
const cSchema = require('../../model/classroom.js');

module.exports = {
    name: 'addstudent',
    run: async function(client, message, args){
        const cs = await cSchema.findOne({ guildID: message.guild.id });
        if(!cs){
            return message.reply('This server hasn\'t been initialized yet!');
        }
        if(!message.member.hasPermission('ADMINISTRATOR')){
            return message.reply('You don\'t have permissions for that.');
        }
        if(!args[0]) return message.reply('Who\'s the new student?');
        const student = message.mentions.members.first() || await message.guild.members.fetch(args[0]);
        if(!student) return message.reply('Couldn\'t find that user!');
        const sRoleID = cs.studentRoleID;
        const tRoleID = cs.teacherRoleID;
        if(student.roles.cache.has(sRoleID) || cs.students.includes(student.id)) return message.reply('That user is already a student!');
        if(student.roles.cache.has(tRoleID)){
            await student.roles.remove(tRoleID);
        }
        if(cs.teachers.includes(student.id)){
            const index = cs.teachers.find(element => {element == student.id});
            cs.teachers.splice(index, 1);
            await cs.save();
        }
        await student.roles.add(sRoleID);
        cs.students.push(student.id);
        await cs.save();
        return message.reply(`Gave ${student.toString()} the student role!`);
    },
}
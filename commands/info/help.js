const Discord = require('discord.js');

module.exports = {
    name: 'help',
    run: async function(client, message, args){
        const help = new Discord.MessageEmbed()
            .setTitle('Discord Classroom Commands')
            .setDescription('Here are all of my commands. Keep in mind, some of them will only be available to teachers.')
            .setFooter(message.author.username, message.author.avatarURL());
        help.addField('`init`', 'Initialize the server with everything required for a classroom.')
        help.addField('`uninit`', 'Uninitialize the server, and delete it from my database')
        help.addField('`addstudent`', 'Add a student to my database and give them the student role')
        help.addField('`addteacher`', 'Add a teacher to my database and give them the teacher role')
        help.addField('`deletestudent`', 'Delete a student from my database and take away their student role')
        help.addField('`deleteteacher`', 'Delete a teacher from my database and take away their teacher role')
        message.reply(help);
    },
}
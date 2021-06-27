const Discord = require('discord.js');
const functions = require('./functions.js');
const config = require('./config.json');
const mongoose = require('mongoose');
const client = new Discord.Client({
    disableEveryone: true,
});

client.commands = new Discord.Collection();

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
	console.log(`Bot User ${client.user.username} has been logged in and is ready to use!`);
	client.user.setActivity('!help', { type: 'WATCHING' });
    functions.connectMongoose(mongoose);
});

client.on('message', async message => {
    const prefix = config.prefix;
    if(message.author.bot){
        return;
    }
    if(!message.content.startsWith(prefix)){
        return;
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    const command = client.commands.get(cmd);
	if (command) {
		command.run(client, message, args);
	}

})

client.login(config.token);
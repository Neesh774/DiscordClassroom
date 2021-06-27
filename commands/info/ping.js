const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    run: async function(client, message, args){
        message.channel.send('Pong!');
    },
}
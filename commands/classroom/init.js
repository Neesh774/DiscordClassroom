const Discord = require('discord.js');
const mongoose = require('mongoose');
const cSchema = require('../../model/classroom.js')
const functions = require('../../functions.js');
module.exports = {
    name: 'init',
    run: async function(client, message, args){
        const guild = message.guild;
        const isInit = await cSchema.exists({ guildID: guild.id });
        if(isInit){
            return message.reply('This server has already been initialized.');
        }
        const tRole = {
            data: {
                name: 'Teacher',
                color: 'GREEN',
                hoist: true,
                permissions: 'ADMINISTRATOR',
                mentionable: true,
            },
            reason: 'Classroom Initialization',
        }
        const sRole = {
            data: {
                name: 'Student',
                color: 'BLUE',
                hoist: true,
                permissions: ['ADD_REACTIONS', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'CONNECT', 'SPEAK'],
                mentionable: false,
            },
            reason: 'Classroom Initialization',
        }
        let tRoleID = '';
        let sRoleID = '';
        await guild.roles.create(tRole).then(role => {
            message.channel.send('Created `TEACHERS` role!');
            tRoleID = role.id;
        });
        await guild.roles.create(sRole).then(role => {
            message.channel.send('Created `STUDENT` role!');
            sRoleID = role.id;
        });

        const iCategory = {
            type: 'category',
            topic: 'Important Announcements for the Whole Classroom',
            nsfw: false,
            reason: 'Classroom Initialization',
        }

        const sCategory = {
            type: 'category',
            topic: 'For Studying',
            nsfw: false,
            permissionOverWrites: [
                {
                    id: tRoleID,
                    deny: ['VIEW_CHANNEL'],
                },
            ],
            reason: 'Classroom Initialization',
        }

        const vCategory = {
            type: 'category',
            topic: 'For chatting',
            nsfw: false,
            reason: 'Classroom Initialization',
        }
        const ids = await functions.createImportant(message, iCategory);
        const rID = ids[0];
        const asID = ids[1];
        const sID = ids[2];
        const rWebhook = `https://canary.discordapp.com/api/webhooks/${ids[3]}/${ids[4]}`;
        const asWebhook = `https://canary.discordapp.com/api/webhooks/${ids[5]}/${ids[6]}`;
        const sWebhook = `https://canary.discordapp.com/api/webhooks/${ids[7]}/${ids[8]}`;
        let sSChannel;
        let sMChannel;
        let sSHChannel;
        await guild.channels.create('study', sCategory).then(cat => {
            message.channel.send('Created `STUDY` category!');
            sSChannel = {
                type: 'text',
                topic: 'Get together to study',
                nsfw: false,
                parent: cat,
                reason: 'Classroom Initialization',
            }
            sMChannel = {
                type: 'text',
                topic: 'Share relevant media (articles, videos, etc)',
                nsfw: false,
                parent: cat,
                reason: 'Classroom Initialization',
            }
            sSHChannel = {
                type: 'text',
                topic: 'Show off things that you are proud of',
                nsfw: false,
                parent: cat,
                reason: 'Classroom Initialization',
            }
        });
        await guild.channels.create('Study', sSChannel).then(message.channel.send('Created `STUDY` channel!'));
        await guild.channels.create('Media', sMChannel).then(message.channel.send('Created `MEDIA` channel!'));
        await guild.channels.create('Show-off', sSHChannel).then(message.channel.send('Created `SHOW-OFF` channel!'));
        let vSChannel;
        let vCChannel;
        let vPChannel;
        guild.channels.create('voice channels', vCategory).then(cat => {
            message.channel.send('Created `VOICE CHANNELS` category!');
            vSChannel = {
                type: 'voice',
                topic: 'For studying with your friends!',
                nsfw: false,
                parent: cat,
                reason: 'Classroom Initialization',
            }
            vCChannel = {
                type: 'voice',
                topic: 'Anything that applies to the entire classroom',
                nsfw: false,
                parent: cat,
                reason: 'Classroom Initialization',
            }
            vPChannel = {
                type: 'voice',
                topic: 'For studying in a private group',
                nsfw: false,
                parent: cat,
                userLimit: 5,
                reason: 'Classroom Initialization',
            }
        });
        await guild.channels.create('Study 1', vSChannel).then(message.channel.send('Created `STUDY 1` voice channel!'));
        await guild.channels.create('Study 2', vSChannel).then(message.channel.send('Created `STUDY 2` voice channel!'));
        await guild.channels.create('Classroom', vCChannel).then(message.channel.send('Created `CLASSROOM` voice channel!'));
        await guild.channels.create('Private 1', vPChannel).then(message.channel.send('Created `PRIVATE 1` voice channel!'));
        await guild.channels.create('Private 2', vPChannel).then(message.channel.send('Created `PRIVATE 2` voice channel!'));
        const cs = new cSchema({
            guildID: guild.id,
            name: guild.name,
            studentRoleID: sRoleID,
            students: [],
            teacherRoleID: tRoleID,
            teachers: [],
            resourcesChannelID: rID,
            resources: [],
            resourcesWebhook: rWebhook,
            assignmentsChannelID: asID,
            assignments: [],
            assignmentsWebhook: asWebhook,
            schedulesChannelID: sID,
            schedules: [],
            schedulesWebhook: sWebhook,
        });
        await cs.save();
        message.reply('Succesfully created your Discord Classroom!');
    },
}
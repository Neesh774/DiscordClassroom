const config = require('./config.json');
module.exports = {
    connectMongoose: async function(mongoose) {
		await mongoose.connect(config.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
	},
    createImportant: async function(message, iCategory){
        const guild = message.guild;
        const ids = [];
        let cat;
        await guild.channels.create('important', iCategory).then(category => {
            cat = category;
        });
        message.channel.send('Created `IMPORTANT` category!');
        const iAChannel = {
            type: 'text',
            topic: 'Important Announcements by the Teachers',
            nsfw: false,
            parent: cat,
            reason: 'Classroom Initialization',
        }
        const iRChannel = {
            type: 'text',
            topic: 'Important resources from the teachers',
            nsfw: false,
            parent: cat,
            reason: 'Classroom Initialization',
        }
        const iAsChannel = {
            type: 'text',
            topic: 'All of the classroom assignments',
            nsfw: false,
            parent: cat,
            reason: 'Classroom Initialization',
        }
        const iSChannel = {
            type: 'text',
            topic: 'Schedules for the class',
            nsfw: false,
            parent: cat,
            reason: 'Classroom Initialization',
        }
        let rChannel;
        let asChannel;
        let sChannel;
        await guild.channels.create('Announcements', iAChannel).then(message.channel.send('Created `ANNOUNCEMENTS` channel!'));
        await guild.channels.create('Resources', iRChannel).then(c => {
            rChannel = c;
            message.channel.send('Created `RESOURCES` channel!')
            ids.push(c.id);
        });
        await guild.channels.create('Assignments', iAsChannel).then(c => {
            asChannel = c;
            message.channel.send('Created `ASSIGNMENTS` channel!')
            ids.push(c.id);
        });
        await guild.channels.create('Schedules', iSChannel).then(c => {
            sChannel = c;
            message.channel.send('Created `SCHEDULES` channel!')
            ids.push(c.id);
        });
        await rChannel.createWebhook('Resources', {
            avatar: 'https://media.discordapp.net/attachments/764571615630589975/858459599459319828/81qnV2URiPL._AC_SL1500__1.png',
        }).then(wb => {ids.push(wb.id); ids.push(wb.token)});
        await asChannel.createWebhook('Assignments', {
            avatar: 'https://media.discordapp.net/attachments/764571615630589975/858459599459319828/81qnV2URiPL._AC_SL1500__1.png',
        }).then(wb => {ids.push(wb.id); ids.push(wb.token)});
        await sChannel.createWebhook('Schedules', {
            avatar: 'https://media.discordapp.net/attachments/764571615630589975/858459599459319828/81qnV2URiPL._AC_SL1500__1.png',
        }).then(wb => {ids.push(wb.id); ids.push(wb.token)});
        return ids;
    },
}
const router = require('express').Router();
const cSchema = require('../../../model/classroom.js');
const axios = require('axios');
router.post('/assignment', async (req, res) => {
    console.log('GOT ASSIGNMENT');
    try{
        console.log(req.data)
        const room = await cSchema.findOne({ guildID: req.data.guildID });
        const assignment = {
            title: req.data.title,
            desc: req.data.description,
            links: req.data.links,
        }
        room.assignments.push(assignment);
        await room.save();
        const webhookURL = room.assignmentsWebhook;
        const fields = assignment.links.split(/\n/);
        const embedObj = {
            title: assignment.title,
            description: assignment.description,
            fields: fields,
        }
        const embed = {
            embeds: [
                embedObj,
            ],
        }
        axios.post(webhookURL, embed)
    }
    catch(e) {
        res.status(401).send({ msg: 'couldn\'t get that data' })
        console.log(e);
    }
})

module.exports = router;
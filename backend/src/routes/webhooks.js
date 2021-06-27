const router = require('express').Router();
const cSchema = require('../../../model/classroom.js');
const axios = require('axios');
router.post('/assignment', async (req, res) => {
    try{
        const room = await cSchema.findOne({ guildID: req.body.guildID });
        const assignment = {
            title: req.body.title,
            desc: req.body.description,
            links: req.body.links,
        }
        room.assignments.push(assignment);
        await room.save();
        const webhookURL = room.assignmentsWebhook;
        const fields = assignment.links.split(/\n/).map((link, index) => {
            return {
                name: `Link ${index + 1}`,
                value: link,
            }
        })
        const embedObj = {
            title: assignment.title,
            description: assignment.desc,
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

router.post('/resources', async (req, res) => {
    try{
        const room = await cSchema.findOne({ guildID: req.body.guildID });
        const resource = {
            title: req.body.title,
            desc: req.body.description,
            links: req.body.links,
        }
        room.resources.push(resource);
        await room.save();
        const webhookURL = room.resourcesWebhook;
        const fields = resource.links.split(/\n/).map((link, index) => {
            return {
                name: `Link ${index + 1}`,
                value: link,
            }
        })
        const embedObj = {
            title: resource.title,
            description: resource.desc,
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
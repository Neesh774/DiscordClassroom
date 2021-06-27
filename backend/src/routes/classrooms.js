const router = require('express').Router();
const cSchema = require('../../../model/classroom.js');

router.get('/classrooms', async (req, res) => {
    console.log(`${req}`);
    try{
        const data = await cSchema.find({});
        if(!data) res.status(200).send({ msg: 'couldn\'t get classrooms data' })
        res.send({ data: data })
    }
    catch(e) {
        res.status(200).send({ msg: 'couldn\'t get that data' })
        console.log(e);
    }
})

module.exports = router;
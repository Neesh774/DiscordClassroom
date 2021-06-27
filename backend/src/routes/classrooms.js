const router = require('express').Router();
const cSchema = require('../../../model/classroom.js');

router.get('/classrooms', async (req, res) => {
    console.log(`REQ: ${req}`);
    const data = await cSchema.find({});
    res.send({ data: data })

})

module.exports = router;
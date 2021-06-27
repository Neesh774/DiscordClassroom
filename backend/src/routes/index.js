const router = require('express').Router();
const classrooms = require('./classrooms');
const auth = require('./auth')
const discord = require('./discord')

router.use('/auth', auth)

router.use('/api', classrooms)

module.exports = router;
const router = require('express').Router();
const classrooms = require('./classrooms');
const auth = require('./auth')
const discord = require('./discord')
const webhooks = require('./webhooks');
router.use('/auth', auth)

router.use('/auth', classrooms)
router.use('/auth', webhooks)
module.exports = router;
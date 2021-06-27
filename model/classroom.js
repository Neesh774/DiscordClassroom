const mongoose = require('mongoose');

const cSchema = mongoose.Schema({
    guildID: String,
    studentRoleID: String,
    students: Array,
    teacherRoleID: String,
    teachers: Array,
    resourcesChannelID: String,
    resources: Array,
    resourcesWebhook: String,
    assignmentsChannelID: String,
    assignments: Array,
    assignmentsWebhook: String,
    schedulesChannelID: String,
    schedules: Array,
    schedulesWebhook: String,
})

module.exports = mongoose.model('classroom', cSchema);
var mongoose = require('mongoose')
var MessageSchema = require('../schemas/message')
var Messages = mongoose.model('messages',MessageSchema)

module.exports = Messages;
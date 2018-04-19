var mongoose = require("mongoose");

var Userschema =  mongoose.Schema({
	username:String,
	pwd:String,
	phone:String
});

module.exports = Userschema;
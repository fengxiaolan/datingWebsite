var mongoose = require("mongoose");

var workschema =  mongoose.Schema({
			id:String,
			logoimg:String,
			workname :String,
			companyname :String,
			workexp :String,
			worktype :String,
			workaddress :String,
			salay :String
});

module.exports = workschema;
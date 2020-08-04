const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var userSchema = new Schema({
	_id : Schema.ObjectId,
	user_name: {
		type: String, required: true, maxLength: 40
	},
	age: {
		type: Number, required: false
	},
	dialogs : [],

	password: {
		type:String, required: true, maxLength: 40, minLength:6
	},
})
module.exports = mongoose.model('Users', userSchema)
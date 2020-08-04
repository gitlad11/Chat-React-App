const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var messageSchema = new Schema({
	_id : Schema.ObjectId,
	sender: {
		type: String, required:true
	},
	text: {
		type: [String]
	},
	sent_date: {
		type: Date,
	},
})
module.exports = mongoose.model('Messages', messageSchema)
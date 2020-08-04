const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var dialogSchema = new Schema({
	_id : Schema.ObjectId,
	users: [],
	messages: [],
	
})
module.exports = mongoose.model('Dialogs', dialogSchema)
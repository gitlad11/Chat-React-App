const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Users = require('./Users')
var dialogSchema = new Schema({
	users: [],
	messages: [],
	
})
dialogSchema.pre('save', (next) =>{
	Users.find({_id : this.users}).exec((err, user) =>{
		if(err){
			console.log(`error : ${err.message}`)
		}
		Users.update(user , {
			$push: {
				dialogs : this
			}
		})
	})
})
module.exports = mongoose.model('Dialogs', dialogSchema)
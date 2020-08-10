const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var Dialogs = require('./Dialogs')
var messageSchema = new Schema({
	sender: {
		type: String, required:true
	},
	reciever: {
		type : String, required : true
	},
	text: {
		type: [String]
	},
	sent_date: {
		type: Date,
	},
})
//schemamethod which appends message into dialog 
messageSchema.methods.addMessage = function addMessage(message){
	Dialog.find({users : this.sender,
	 			users : this.reciever}, (dialog) =>{
	 				dialog.updateOne({messages : [message]})
	 	})
}
//before save the message , create dialog if not exists, otherwise pass creating
messageSchema.pre('save', function(next){
	Dialogs.find({users : this.sender}.exec((user) =>{
		if(user){
			Dialogs.find({users : this.reciever}.exec((user) =>{
				if(user){
					return next()
				} else {
						const dialog = new Dialogs({
						users : [this.sender, this.reciever],
						messages : [this],
					})
						dialog.save()
				}
			}))
		}
	}))
})
module.exports = mongoose.model('Messages', messageSchema)
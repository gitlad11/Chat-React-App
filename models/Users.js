const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

var userSchema = new Schema({
	user_name: {
		type: String, required: true, maxLength: 40
	},
	email : {
		type: String
	},
	age: {
		type: Number, required: false
	},
	dialogs : [],

	password: {
		type:String, required: true, maxLength: 40, minLength:6
	},
})
userSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password);
};

userSchema.pre("save", function(next){
	if(!this.isModified("password")){
		return next();
	}
	this.password = bcrypt.hashSync(this.password, 10);
	next();
})
//userSchema.pre('save', function saveHook(next){
		//var instance = this

	//if (!instance.isModified('password')){
		//return next();
	//return bcrypt.genSalt((error, salt) =>{
		//if(error){
			//return next(error);
		//}
		//return bcrypt.hash(instance.password, salt, (error, hash) =>{
			//if(error){
				//return next(error)
			//}
			//instance.password = hash;
			//return next();
		//})	
	//})	
//}
//})
module.exports = mongoose.model('Users', userSchema)
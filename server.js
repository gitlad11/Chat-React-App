const express = require('express')
const bcrypt = require('bcrypt')
const session = require('express-session')
const path = require('path')
const mongoose = require('mongoose')
const connectmongo = require('connect-mongo')
const io = require('socket.io')
const http = require('http')
const cors = require('cors')
//const passport = require('passport')
//const passportJWT = require('passport-jwt')


//const LocalStrategy = require('passport-local').Strategy;
var JwT = require('jsonwebtoken')

var config = require('./config.json')
var moment = require('moment');
var now = moment().format("YYYY : MM : DD");

			//connectmongo for store cookies in the particular collection
var MongoStore = connectmongo(session)
var Users = require('./models/Users')
var Messages = require('./models/Messages')
var Dialogs = require('./models/Dialogs')
var router = express.Router()
var app = express()
var PORT = config.port || 3002
var HOST = 'http://localhost'
var DB_Collection = 'local'
var DB_PORT = '27017'
var DB_HOST = `mongodb://localhost`
var server = http.createServer(app)
var socketio = io(server)

				//cors for server to let headers 
				//credentials for cookies
app.use(cors({
	origin : `${HOST}:${PORT}`,
	credentials: true
}))

//express middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(express.static(path.join(__dirname, 'public')))
					
//////////////////////////////// PASSPORT AND SESSIONS ///////////////////////////////////////////////
				//for JWT, sessionsmiddleware is useless
				//sessions contains id of users, server gives JWT to client like a key
				//JWT is stored on client side
//var ExtractJWT = passportJWT.ExtractJwt
//var Strategy = passportJWT.Strategy

//app.use(passport.initialize())
//app.use(passport.session())
//app.use(session({
	//key : 'sid',
	//secret: config.sessionkey,
	//resave: true,
	//saveUninitialized: false,
	//cookie: {
    //maxAge: 10 * 60 * 1000,
    //httpOnly: false,
  	//},
	//store: new MongoStore({
		//url: `${DB_HOST}:${DB_PORT}/test`
	//})
//}))
			//serializer for checking if user have data in cookie
//passport.serializeUser((user, done) => {
	//done(null, user._id)
//})
//passport.deserializeUser(function(_id, done){
	//Users.findById(_id, (err, user) =>{
		//done(err, user);
	//})
//})


			//passport strategy for authentication
			//LOCAL is not for RESTfull API , fetch, ajax, axios ,apollo 

//passport.use(
	//new LocalStrategy((username , password , done) => {
		//Users.findOne({ user_name : username}, function(error, user){
			//if(error){
				//return done(error);
			//}
			//if(!user){
				//return done(null,false, {message : `no such user`});
			//}
			//if(!user.comparePassword(password)){
				//return done(null, false, {message : `password is not correct`})
			//}
			//return done(null, user)
		//})
	//})
	//)

			//jsonwebtoken is sending to client,api with token after registration
//const params = {
  //secretOrKey: config.secret,
  //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
//};
//passport.use( new Strategy(params, (payload, done) =>{
			//Users.findOne({ _id : payload.sub}, (error, user) =>{
				//if(user.length == 0){
					//return done(new Error('такого пользователя нет'))
				//}
				//if(!user.comparePassword(password)){
					//return done(new Error('пароли не совпадают'))
				//} else {
					//return done(null, user)
				//}
			//})
//}))


			//connection to database, after if connection success run express server
mongoose.connect(`${DB_HOST}:${DB_PORT}/${DB_Collection}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) =>{
	mongoose.Promise = global.Promise;
	mongoose.connection.on('error', error =>{
		console.log(`Problem to connect to db:${error}`)
	})
	console.log(`connected to db: ${DB_Collection}`)
	app.listen(PORT, () =>{
		console.log(`server is running on ${HOST}:${PORT}`)
	})
})
//routes and views for api
app.get('/api/users', function(req, res){
	Users.find({}).exec()
	.then(function(document){
	var data =  JSON.stringify(document)
		res.send(data)
	})
})
app.get('/api/user', (req, res) =>{
	Users.findOne({_id : req._id}).exec()
	.then((user) =>{
		var data = JSON.stringify(user)
		res.send(data)
	})
})
app.get('/api/messages', function(req, res){
	Messages.find({}).exec()
	.then(function(document){
	var data = JSON.stringify(document)
		res.send(data)
	})
})
app.post('/api/signup', (req, res, next) =>{
		console.dir(req.body)
		const user = new Users({
			user_name: req.body.username,
			email : req.body.email,
			age : req.body.age,
			password : req.body.password
		});
		user.save().then((response) => {
			console.log(`User saved`)
			res.status(201).json({
				message: `User successfully created`,
				result: response
			});
		}).catch(error => {
			console.log(`error : ${error}`)
			res.status(500).json({
				error: error,
				message : error.message
			})
		})
	})

//findOne is not working
app.post('/api/login', (req, res, next) =>{
	console.dir(req.body)
	Users.findOne({user_name : req.body.username}).exec()
		.then((user) =>{
		if(!user){
			console.log(`no found user`)
			res.send({success: false, message : 'authentication failed, User is not found'})
		} else if(!user.comparePassword(req.body.password)){
			console.log(`comparePassword is failed`)
			res.send({success : false, message : `wrong password`})	
		} else {
			var token = jwt.sign(user, config.secret, {
				expiresIn : 1000000
			})
			res.send({success : true, jwtToken : "JWT"+token})
		} 
	})
})

app.post('/api/messages', (req, res, next) =>{
	if(req.body.message){
		const message = new Messages({
			sender : req.body.user,
			reciever : req.body.reciever,
			text : req.body.message,
			sent_date : now(),
		})
	}
})


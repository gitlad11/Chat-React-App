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
var jwt = require('jsonwebtoken')
var authenticate = require('./Authenticate')
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
	origin : `${HOST}:3000`,
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
app.get('/users', function(req, res){
	if(req){
		console.dir('sending users')
	}
	Users.find({}).exec()
	.then(function(document){
	var data =  JSON.stringify(document)
		res.send(data)
	})
})
app.get('/user', (req, res) =>{
	Users.findOne({_id : req._id}).exec()
	.then((user) =>{
		var data = JSON.stringify(user)
		res.send(data)
	})
})

app.post('/signup', (req, res, next) =>{
		console.dir(req.body)
		const user = new Users({
			user_name: req.body.username,
			email : req.body.email,
			age : req.body.age,
			password : req.body.password
		});
		user.save().then((user) => {
			console.log(`User saved`)
			return res.send({success: true, message : 'You has been registered' , data : user});
		}).catch(error => {
			console.log(`error : ${error.message}`)
			return res.send({success: false, message : error.message})
		})
	})

//if user exists and password matchs send token with user(claim) to react app
app.post('/login', (req, res, next) =>{
	if(req.body.username){
	console.dir(req.body)
	Users.findOne({user_name : req.body.username})
		.then((user) =>{
		if(!user){
			console.log(`no found user`)
			return res.send({success: false, message : 'пользователя с таким именем нет'})
		} else if(!user.comparePassword(req.body.password)){
			console.log(`comparePassword is failed`)
			return res.send({success : false, message : `Неправильный пароль`})	
		} else {
			var token = jwt.sign({ id : user._id}, config.secret, {
				expiresIn : 1000000
			})
			return res.send({success : true, token, user})
		} 
	})
	}	
})
//check if User from client side have valid token
app.post('/tokenValid', async (req, res) =>{
	if(req){
		console.dir(req.headers)
	}
	try {
		var token = req.headers("x-auth-token");
		if(!token){ return res.json({ message : `you dont have token`})}

	const verify = jwt.verify(token, config.secret);
	if(!verified){ return res.json(false) }

	const user = await Users.findById(verified.id);
	if(!user){ return res.json(false) }

	return res.json(true)
} catch (error) {
	res.status(500).json({error : error.message})
	}
})
//access to message only for token
app.get('/messages', authenticate, function(req, res){
	Messages.find({}).exec()
	.then(function(document){
	var data = JSON.stringify(document)
		res.send(data)
	})
})
app.post('/messages', authenticate, (req, res, next) =>{
	if(req.body.message){
		const message = new Messages({
			sender : req.body.user,
			reciever : req.body.reciever,
			text : req.body.message,
			sent_date : now(),
		})
	}
})
app.delete('/delete', authenticate, (req, res) =>{
	try { 
		Users.findByIdAndDelete(req.user).then((user) =>{
			res.json({message : `Пользователь был удален : ${user}`})
		})
	} catch (error) {
		res.status(500).json({error : error.message})
	}
})


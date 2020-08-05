const express = require('express')
const bcrypt = require('bcrypt')
const session = require('express-session')
const path = require('path')
const mongoose = require('mongoose')
const connectmongo = require('connect-mongo')
const io require('socket.io')
const http = require('http')
const cors = require('cors')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

var moment = require('moment');
var now = moment().format("YYYY : MM : DD");

var MongoStore = connectmongo(session)
var Users = require('./models/Users')
var Messages = require('./models/Messages')
var Dialogs = require('./models/Dialogs')
var router = express.Router()
var app = express()
var PORT = 3001 || 3008
var HOST = 'http://localhost'
var DB_Collection = 'local'
var DB_PORT = '27017'
var DB_HOST = `mongodb://localhost`
var http = http.createServer(app)
var io = io(http)

//cors for server to let headers 
//credentials for cookies
app.use(cors({
	origin : "http://localhost:3000",
	credentials: true
}))

//express middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	key : 'sid',
	secret: 'secretosty',
	resave: true,
	saveUninitialized: false,
	cookie: {
    maxAge: 10 * 60 * 1000,
    httpOnly: false,
  	},
	store: new MongoStore({
		url: `${DB_HOST}:${DB_PORT}/test`
	})
}))
//serializer for checking if user have data in browser
passport.serializeUser((user, done) => {
	done(null, user._id)
})
passport.deserializeUser(function(id, done){
	Users.findById(id, (err, user) =>{
		done(err, user);
	})
})
//passport strategy for authentication
passport.use(
	new LocalStrategy((username , password , done) => {
		Users.findOne({ user_name : username}, function(error, user){
			if(error){
				return done(error);
			}
			if(!user){
				return done(null,false);
			}
			if(!user.comparePassword(password)){
				return done(null, false)
			}
			return done(null, user)
		})
	})
	)
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
	bcrypt.hash(req.body.password, 10).then((hash) =>{
		const user = new Users({
			user_name: req.body.user_name,
			age : req.body.age,
			password : hash
		});
		user.save().then((response) => {
			res.status(201).json({
				message: `User successfully created`,
				result: response
			});
		}).catch(error => {
			res.status(500).json({
				error: error
			})
		})
	})
});


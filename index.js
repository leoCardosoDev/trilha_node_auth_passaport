const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')

const app = express()

// passport.use(require('./src/auth/basic'))
// app.get('*', passport.authenticate('basic', { session: false }))

require('./src/auth/local')(passport)

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(session({ secret: '3_u459#^&hhafsajsTr34&8#@frTgfQ', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))

require('./src/index')(app, passport)

mongoose.connect('mongodb://127.0.0.1:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = global.Promise

app.listen(9000, () => {
  console.log('Express has been started')
})

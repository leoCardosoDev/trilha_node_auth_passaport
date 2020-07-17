const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const passport = require('passport')
const mongoose = require('mongoose')

const app = express()

// passport.use(require('./src/auth/basic'))
// app.get('*', passport.authenticate('basic', { session: false }))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'src/view'))

require('./src/index')(app)

mongoose.connect('mongodb://127.0.0.1:27017/auth', {useNewUrlParser: true, useUnifiedTopology: true})

app.listen(9000, () => {
  console.log('Express has been started')
})

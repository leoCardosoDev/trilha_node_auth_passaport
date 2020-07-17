const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const passport = require('passport')


const app = express()

passport.use(require('./src/auth/basic'))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

app.get('*', passport.authenticate('basic', { session: false }))
require('./src/index')(app)

app.listen(9000, () => {
  console.log('Express has been started')
})

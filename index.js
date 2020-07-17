const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./src/index')(app)

app.listen(9000, () => {
  console.log('Express has been started')
})

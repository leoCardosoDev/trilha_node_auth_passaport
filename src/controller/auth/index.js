const express = require('express')
const passport = require('passport')
const router = express.Router()

module.exports = (passport) => {
  router.get('/', require('./login'))
  router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/users',
    failureRedirect: '/'
  }))
  return router
}
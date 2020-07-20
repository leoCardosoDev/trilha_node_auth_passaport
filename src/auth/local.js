const LocalStrategy = require('passport-local')
const User = require('./../model/user')

module.exports = (passport) => {
  passport.serializeUser((user, callback) => {
    return callback(null, user._id)
  })
  passport.deserializeUser((id, callback) => {
    User.findById(id)
      .then(user => callback(null, user))
      .catch(error => callback(error, {}))
  })
  passport.use('local-signup', new LocalStrategy({
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    function (req, username, password, callback) {
      User.findOne({
          username: username
        })
        .then((userExists) => {
          if (!userExists) {
            let user = new User(req.body)
            user.password = user.genHash(user.password)
            return user.save()
              .then((user) => {
                return callback(null, user)
              })
              .catch((error) => {
                console.log(error)
                return
              })
          }
          callback(null, false)
        }).catch(error => callback(error, false))
    }
  ))

  passport.use('local-signin', new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
  }, function (req, username, password, callback) {
    User.findOne({
      username
    }).then((user) => {
      if (!user) {
        return callback(null, false)
      }
      user.validate(password, (error, result) => {
        if(!result || error){
          return callback(null, false)
        }
        return callback(null, user)
      })
    }).catch(error => callback(error, false))
  }))

}
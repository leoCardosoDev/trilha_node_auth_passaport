const BasicStrategy = require('passport-http').BasicStrategy

module.exports = new BasicStrategy(
  function(username, password, callback){
    if(username === 'admin' && password === 'admin')
    return callback(null, true)
    else
    return callback(null, false)
  }
)

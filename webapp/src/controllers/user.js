const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    if(!user.username || !user.firstname || !user.lastname)
      return callback(new Error("Wrong user parameters"), null)
    
    db.hgetall(user.username, (err, res) => {
      if (res) {
        return callback(new Error('Username already exists'), null)
      }
      const userObj = {
        firstname: user.firstname,
        lastname: user.lastname,
      }
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        return callback(null, res)
      })
    })
  },
  get: (username, callback) => {
    db.hgetall(username, (err, res) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, res);
    });
  },
};
 
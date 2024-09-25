const bcrypt = require('bcrypt')

exports.createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

exports.isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)
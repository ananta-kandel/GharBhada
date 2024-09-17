const jwt = require('jsonwebtoken');

const generateToken = function(data){
        const token = jwt.sign(data, "ananta")
        return token
}

module.exports = generateToken

const jwt = require('jsonwebtoken')

const tokenize =(user)=>{
    // secrete length = 55 chars
    let secrete = "12345678900987654321abcdefjhijklmnopqrstuvwxyz123456789"
    const Token = jwt.sign( user, secrete, {expiresIn:'2 days'});
    return Token
}



module.exports = {tokenize}
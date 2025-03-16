var jwt = require('jsonwebtoken');
require('dotenv').config();


function createToken(atherant){
    let payload = {email: atherant.email}
    const token = jwt.sign( payload, process.env.secretKey, {expiresIn: '1h'});
    return token;
}
module.exports = {createToken}
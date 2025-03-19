var jwt = require('jsonwebtoken');
require('dotenv').config();
const ACCESS_TOKEN_EXPIRATION = '1h';

function createToken(atherant) {
    let payload = { email: atherant.email };
    const token = jwt.sign(payload, process.env.secretKey, { expiresIn: ACCESS_TOKEN_EXPIRATION }); 
    return token;
}
function verifyToken(token) {
    try {
        const isBearerToken = token.split(" ");
        if (isBearerToken[0] !== "Bearer") {
            return { error: true,status:401, message: "Authentification requise. Vous devez être connecté pour effectuer cette action.Format du token invalide."};
        }
        const decoded = jwt.verify(isBearerToken[1], process.env.secretKey);
        const atherant = decoded.email;
        return atherant;
    } catch (error) {
        return { error: true, status:401,message: "Authentification requise. Vous devez être connecté pour effectuer cette action." };
    }
}

module.exports = { createToken, verifyToken }
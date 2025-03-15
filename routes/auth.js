const express = require('express');

const controllersAth = require('../controllers/authControllers');

const apiRouterAuth = express.Router();

apiRouterAuth.route('/login').post(controllersAth.login);
apiRouterAuth.route('/register').post(controllersAth.register);
apiRouterAuth.route('/logout').get(controllersAth.logout);


module.exports = apiRouterAuth;
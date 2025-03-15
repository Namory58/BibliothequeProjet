// imports
require('dotenv').config();
var morgan = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
const sequelize = require('./database/db');
const {setData, cheackData} = require('./models/dataModels');
const apiRouterAdherents = require('./routes/adherents');
var app = express();
var port = process.env.PORT;

const adherentsRouters =require('./routes/adherents');
const authRouters = require('./routes/auth');

async function authenticateDb(){
    return sequelize.authenticate()
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

authenticateDb().then(async () => {
    await sequelize.sync({alter: true });
    console.log('Connexion établie avec la base de données');
    await cheackData();
}).catch(err => {
    console.error('Connexion échoué :', err);
});

// Routes
app.use('/v1/api', adherentsRouters); 
app.use('/v1/api/adherents', authRouters); 

// Ecoute du serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
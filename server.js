require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database/db');
const { cheackData } = require('./models/dataModels');

const adherentsRouters = require('./routes/adherents');
const authRouters = require('./routes/auth');
const livreRouters = require('./routes/livres');

const app = express();
const port = process.env.PORT || 3000;

async function authenticateDb() {
    return sequelize.authenticate();
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

authenticateDb().then(async () => {
    await sequelize.sync({ alter: true });
    console.log('Connexion établie avec la base de données');
    await cheackData();
}).catch(err => {
    console.error('Connexion échouée :', err);
});

// Routes
app.use('/v1/api', adherentsRouters);
app.use('/v1/api', livreRouters);
app.use('/v1/api/adherents', authRouters);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASENAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host: process.env.HOST,   
    dialect: process.env.DIALECT,
    port: process.env.PORT_DB, 
    timezone: '+01:00',
})
module.exports = sequelize;

const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const Emprunts = sequelize.define("Emprunts", {
    idEmprunt: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    dateEmprunt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    dateRetour: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: "emprunts",
    timestamps: false,
});

module.exports = Emprunts;

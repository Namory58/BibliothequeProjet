const sequelize = require("../database/db");
const { DataTypes, Sequelize } = require("sequelize");
const Emprunts = require("./Emprunts"); // Import Emprunts model

const Adherents = sequelize.define("Adherents", {
    idAdherent: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "adherents",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
});

Adherents.hasMany(Emprunts, {
    foreignKey: 'idAdherent',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Emprunts.belongsTo(Adherents, {
    foreignKey: 'idAdherent',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = Adherents;

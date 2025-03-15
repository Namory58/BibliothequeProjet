const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const Auteurs = sequelize.define("Auteurs", {
    idAuteur: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nomAuteur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenomAuteur: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationalite: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    biographie: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: "auteurs",
    timestamps: false,
});

// Relationships
Auteurs.hasMany(require('./Livres'), {
    foreignKey: 'idAuteur',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
require('./Livres').belongsTo(Auteurs, {
    foreignKey: 'idAuteur',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});

module.exports = Auteurs;

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

// Définition de l'association dans une méthode dédiée
Auteurs.associate = function(models) {
    Auteurs.hasMany(models.Livres, {
        foreignKey: 'idAuteur',
        as: 'livres',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
};

module.exports = Auteurs;
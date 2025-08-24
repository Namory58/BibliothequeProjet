const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

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

// Associations à définir dans models/index.js
Adherents.associate = function(models) {
    Adherents.hasMany(models.Emprunts, {
        foreignKey: 'idAdherent',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

module.exports = Adherents;
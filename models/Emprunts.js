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
    idLivre: { // Clé étrangère vers Livres
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idAdherent: { // Clé étrangère vers Adherents
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "emprunts",
    timestamps: false,
});

// Associations à définir dans models/index.js
Emprunts.associate = function(models) {
    Emprunts.belongsTo(models.Livres, {
        foreignKey: 'idLivre',
        as: 'livre',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    Emprunts.belongsTo(models.Adherents, {
        foreignKey: 'idAdherent',
        as: 'adherent',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
};

module.exports = Emprunts;
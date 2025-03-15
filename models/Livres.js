const sequelize = require("../database/db");
const { DataTypes, Sequelize } = require("sequelize");

const Livres = sequelize.define("Livres", {
    idLivre: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titre: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    datePub: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    resume: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    nbR: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    coverLivre: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    createAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updateAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
}, {
    tableName: 'livres',
    timestamps: false,
});

// Relationships
Livres.hasMany(require('./Emprunts'), {
    foreignKey: 'idLivre',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
require('./Emprunts').belongsTo(Livres, {
    foreignKey: 'idLivre',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = Livres;

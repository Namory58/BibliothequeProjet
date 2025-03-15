const sequelize = require("../database/db");
const { DataTypes } = require("sequelize");

const Categories = sequelize.define("Categories", {
    idCategorie: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nomCategorie: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: "categories",
    timestamps: false,
});

// Relationships
Categories.hasMany(require('./Livres'), {
    foreignKey: 'idCategorie',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});
require('./Livres').belongsTo(Categories, {
    foreignKey: 'idCategorie',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
});

module.exports = Categories;

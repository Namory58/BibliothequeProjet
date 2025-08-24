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

// Associations à définir dans models/index.js
Categories.associate = function(models) {
    Categories.hasMany(models.Livres, {
        foreignKey: 'idCategorie',
        as: 'livres',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    });
};

module.exports = Categories;
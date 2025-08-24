const Livres = require('./Livres');
const Auteurs = require('./Auteurs');
const Emprunts = require('./Emprunts');
const Categories = require('./Categories');
const Adherents = require('./Adherents');

Livres.associate({ Auteurs, Categories, Emprunts });
Auteurs.associate({ Livres });
Categories.associate({ Livres });
Emprunts.associate({ Livres, Auteurs, Adherents });

module.exports = {
    Livres,
    Auteurs,
    Emprunts,
    Categories
};
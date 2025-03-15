const auteurs = require('../data/dataAuteurs');
const livres = require('../data/dataLivres');
const category = require('../data/dataCategories'); // C'est ici que tu as chargé tes catégories

const Auteur = require('../models/Auteurs');
const Livre = require('../models/Livres');
const Categorie = require('../models/categories');

async function setData() {
    try {
        await Auteur.bulkCreate(auteurs);
        await Categorie.bulkCreate(category);
        await Livre.bulkCreate(livres);
        for (let i = 0; i < livres.length; i++) {
            const livre = livres[i];
            const auteur = auteurs[i];
            const categorie = category[i];

            const auteurInstance = await Auteur.findOne({
                where: { idAuteur: auteur.id }
            });
            const categorieInstance = await Categorie.findOne({
                where: { idCategorie: categorie.id }
            });
            const livreInstance = await Livre.findOne({
                where: { idLivre: livre.id }
            });
            await livreInstance.setAuteur(auteurInstance);
            livreInstance.idCategorie = categorieInstance.idCategorie;
            await livreInstance.save();
        }

    } catch (error) {
        console.error('Erreur lors de l\'insertion des données :', error);
    }
}

async function cheackData() {
    const countAuteur = await Auteur.count();
    const countCategorie = await Categorie.count();
    const countLivre = await Livre.count();
    if(countAuteur === 0 && countCategorie === 0 && countLivre === 0){
        await setData();
    }
}

module.exports = { cheackData };

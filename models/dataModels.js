const auteurs = require('../data/dataAuteurs');
const livres = require('../data/dataLivres');
const category = require('../data/dataCategories');
const { Auteurs, Livres, Categories } = require('../models'); // Correction ici

async function setData() {
    try {
        await Auteurs.bulkCreate(auteurs);
        await Categories.bulkCreate(category);
        await Livres.bulkCreate(livres);
        for (let i = 0; i < livres.length; i++) {
            const livre = livres[i];
            const auteur = auteurs[i];
            const categorie = category[i];

            const auteurInstance = await Auteurs.findOne({
                where: { idAuteur: auteur.idAuteur }
            });
            const categorieInstance = await Categories.findOne({
                where: { idCategorie: categorie.idCategorie }
            });
            const livreInstance = await Livres.findOne({
                where: { idLivre: livre.idLivre }
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
    const countAuteur = await Auteurs.count();
    const countCategorie = await Categories.count();
    const countLivre = await Livres.count();
    if(countAuteur === 0 && countCategorie === 0 && countLivre === 0){
        await setData();
    }
}

module.exports = { cheackData };
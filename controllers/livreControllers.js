const { Livres, Auteurs } = require("../models");

module.exports = {
    getAllLivres: async function (req, res) {
        try {
            const livres = await Livres.findAll();
            return res.status(200).json({
                error: false,
                message: "listes des livres.",
                data: livres
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Erreur lors de l'affichage des livres.",
                details: error.message
            });
        }
    },

    getLivre: async function (req, res) {
        const livreId = req.params.id;
        try {
            const livre = await Livres.findOne({
                where: { idLivre: livreId },
                include: [{
                    model: Auteurs,
                    as: 'auteur'
                }],
            });

            if (!livre) {
                return res.status(404).json({
                    error: true,
                    message: "Livre introuvable.",
                });
            }

            return res.status(200).json({
                error: false,
                message: "Livre trouvé.",
                data: livre
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Erreur lors de la récupération du livre.",
                details: error.message
            });
        }
    },
    // ...le reste du code...
}
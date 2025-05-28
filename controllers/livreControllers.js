
const { where } = require("sequelize");
const Livres = require("../models/Livres");
const livresModels = require("../models/Livres");
const tokenService = require("../middelware/tokenService");
const Emprunts = require("../models/Emprunts");

module.exports = {
    getAllLivres: async function (req, res) {

        // todoo
        /*
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }*/
        const livres = await livresModels.findAll();
        try {
            return res.status(200).json({
                error: false,
                message: "listes des livres.",
                data: livres
            });
        }
        catch (error) {
            return res.status(200).json({
                error: true,
                message: "Erreur lors de l'affichage des livres.",
            });
        }
    },

    getLivre: async function (req, res) {
        /*
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }*/
        const livreId = req.params.id; // recupérer l'ID du livre depuis les paramètres de la requête
        try {
            const checkLivre = await Livres.findOne({
                where: { idLivre: livreId },
                attributes: { exclude: ["idLivre"] },
            });
            if (!checkLivre) {
                return res.status(404).json({
                    error: true,
                    message: "Livre introuvalle.",
                });
            }
            return res.status(200).json({
                error: false,
                message: "Livre trouvé.",
                data: checkLivre
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Erreur lors de la récupération du livre.",
                details: error.message
            });
        }
    },
    upadateLivre: async function (req, res) {
        /*
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }*/
        // recupérer l'ID du livre depuis les paramètres de la requête
        const livreId = req.params.id;
        try {
            const value = req.body;
            const livreAsUpdate = await Livres.findOne({
                where: { idLivre: livreId },
            });
            if (!livreAsUpdate) {
                return res.status(404).json({
                    error: true,
                    message: "Livre introuvable imposible de modifier.",
                });
            }
            // données sont dans la requête livreAsUpdate
            await livreAsUpdate.update(value);
            return res.status(200).json({
                error: false,
                message: "livre mis à jour avec succès.",
                data: livreAsUpdate,
            });

        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Erreur lors de la mise à jour du livre.",
                details: error.message
            });
        }
    },

    deleteLivre: async function (req, res) {
         /*
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }*/
        // recupérer l'ID du livre depuis les paramètres de la requête
        const livreId = req.params.id;

        try {
            const livreTodelete = await Livres.findOne({
                where: { idLivre: livreId },
            });
            if(!livreTodelete) {
                return res.status(404).json({
                    error: true,
                    message: "Livre introuvable impossible de supprimer.",
                });
            }
            //verifier si le livre est emprunté
            const emprunt = await Emprunts.findOne({
                where: { idLivre: livreId },
            });
            console.log(emprunt);
            if (emprunt) {
                return res.status(400).json({
                    error: true,
                    message: "Impossible de supprimer le livre, il est actuellement emprunté.",
                });
            }
            // Si le livre existe et il n'est pas emprunter, on le supprime
            await livreTodelete.destroy();
            return res.status(200).json({
                error: false,
                message: "Livre supprimé avec succès.",
                data: livreTodelete
            });
        } catch (error) {
            return res.status(500).json({
                error: true,
                message: "Erreur lors de la suppression du livre.",
                details: error.message
            });
        }

    }

}
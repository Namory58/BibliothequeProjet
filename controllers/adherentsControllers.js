
const Atherant = require("../models/Adherents");
const tokenService = require("../middelware/tokenService");
const Empreunteur = require("../models/Emprunts");
const { where } = require("sequelize");
module.exports = {
    getAlladherents: async function (req, res) {
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }
        try {
            const allAtherants = await Atherant.findAll({
                attributes: { exclude: ["password"] },
            });
            res.status(200).json({
                error: false,
                message: 'Liste des atherants.',
                data: allAtherants,
            })
        }
        catch (error) {
            return res.status(500).json({ error: true, message: "Erreur serveur", error });
        }

    },
    getAdherent: async function (req, res) {
        try {
            const id = req.params.id;
            const isAtherants = await Atherant.findOne({
                where: { idAdherent: id },
                attributes: { exclude: ["password"] },
            });
            if (isAtherants === null) {
                return res.status(404).json({
                    error: true,
                    message: "utilisateur non trouvé.",
                });
            };
            res.status(200).json({
                error: false,
                message: 'Liste des atherants.',
                data: isAtherants
            })
        }
        catch (error) {
            return res.status(500).json({ error: true, message: "Erreur serveur", error });
        }

    },
    updateAdherent: async function (req, res) {
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }
        try {
            const id = req.params.id;
            const value = req.body;
            const isAtherants = await Atherant.findOne({
                where: { idAdherent: id },
                attributes: { exclude: ["password"] },
            });
            if (isAtherants === null) {
                return res.status(404).json({
                    error: true,
                    message: "utilisateur non trouvé.",
                });
            };
            const allowedKeys = ["nom", "prenom", "email", "password"];
            let valueVide = [];
            for (const [key, value] of Object.entries(req.body)) {
                if (!allowedKeys.includes(key)) {
                    return res.status(400).json({
                        error: true,
                        message: "Le champ " + key + " n'est pas autorisé."
                    });
                }
                if (value === null || value === undefined || value.trim() === "") {
                    valueVide.push(key);
                }
            }

            if (valueVide.length > 0) {
                return res.status(400).json({
                    error: true,
                    message: "Les champs " + valueVide.join(", ") + " sont obligatoires."
                });
            }
            //verifiaction des value saisir par l'utilisateur .
            await isAtherants.update(value);
            return res.status(200).json({
                error: false,
                message: "utilisateur mis à jour avec succès.",
                data: isAtherants, // Vous pouvez renvoyer l'adhérent mis à jour si nécessaire
            });

        }
        catch (err) {
            return res.status(500).json({
                error: true,
                message: "Erreur serveur lors de la mise à jour de l'utilisateur.",
            });
        }

    },
    deleteAdherent: async function (req, res) {
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }
        try { 
            const id = req.params.id;
            const isAtherants = await Atherant.findOne({
                where: { idAdherent: id },
                attributes: { exclude: ["password"] },
            });
            if (isAtherants === null) {
                return res.status(404).json({
                    error: true,
                    message: "utilisateur non trouvé.",
                });
            };
            const emp = await Empreunteur.findOne(
                { where :{idAdherent : isAtherants.idAdherent}}
            );
            console.log(emp.dateRetour);
            if(emp!=null & emp.dateRetour===null){
                return res.status(404).json({
                    error: true,
                    message: "Impossible de supprimer d'utilisateur.",
                });
            };
            await isAtherants.destroy();
            return res.status(200).json({
                error: true,
                message: "Utilisateur supprimé avec succès.",
                data :{
                    isAtherants
                }
            });

        }
        catch (err) {
            return res.status(500).json({
                error: true,
                message: "Erreur de suppression d'un utilisateurs.",
            });
        }
    },
}; 
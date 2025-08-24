
const ServiceDataStructure = require("../middelware/ServiceDataStructure");
const bcrypt = require('bcrypt');
const { where } = require("sequelize");
const tokenService = require('../middelware/tokenService');
const videService = require('../middelware/videEntity');

const { Adherent } = require("../models");

module.exports = {
    login: async function (req, res) {
        const allowedKeys = ["email", "password"];
       const erreur = videService.videSpce(req, allowedKeys);
       if (erreur) return res.status(400).json(erreur);
        try {
            const { email, password } = req.body;
            if (!ServiceDataStructure.isValidEmail(email)) {
                return res.status(404).json({
                    error: true,
                    message: "L'email n'est pas valide."
                });
            }

            if (!ServiceDataStructure.isValidPassword(password)) {
                return res.status(400).json({
                    error: true,
                    message: "Le mot de passe n'est pas valide et la taille de mot de passe doit être de 8 caractères."
                });
            }
            const cheackDataAdherent = await Adherent.findOne({ where: { email: email } });
            if (!cheackDataAdherent) {
                return res.status(401).json({
                    error: true,
                    message: "Email ou mot de passe incorrecte."
                });
            }
            const matchPassword = await bcrypt.compare(password, cheackDataAdherent.password);
            if (!matchPassword) {
                return res.status(400).json({
                    error: true,
                    message: "email ou mot de passe incorrecte."
                });
            }
            const tokenAdherent = tokenService.createToken(cheackDataAdherent);
            res.cookie("token", tokenAdherent, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict'
            });

            return res.status(200).json({
                error: false,
                message: "utilisateur connecté avec succès.",
                data: {
                    nom: Adherent.nom,
                    prenom: Adherent.prenom,
                    email: Adherent.email,
                },
                token: tokenAdherent
            });

        } catch (error) {
            res.status(500).json({
                error: true,
                message: "Erreur lors de la création de l'utilisateur.",
                data: error
            });
        }
    },
    register: async function (req, res) {
    const allowedKeys =["nom","prenom","email", "password"];
    const erreur = videService.videSpce(req, allowedKeys);
    if (erreur) return res.status(400).json(erreur);
        try {
            const { nom, prenom, email, password } = req.body;
            if (!ServiceDataStructure.isValidName(nom) || nom.length > 72) {
                return res.status(400).json({
                    error: true,
                    message: "Le nom n'est pas valide."
                });
            }
            if (!ServiceDataStructure.isValidPrenom(prenom) || prenom.length > 72) {
                return res.status(400).json({
                    error: true,
                    message: "Le prénom n'est pas valide."
                });
            }
            if (!ServiceDataStructure.isValidEmail(email)) {
                return res.status(400).json({
                    error: true,
                    message: "L'email n'est pas valide."
                });
            }
            if (!ServiceDataStructure.isValidPassword(password)) {
                return res.status(400).json({
                    error: true,
                    message: "Le mot de passe n'est pas valide et la taille de mot de passe doit être de 8 caractères."
                });
            }
            const existingUser = await AdherentsModels.findOne({ where: { email: email } });
            if (existingUser) {
                return res.status(409).json({
                    error: true,
                    message: "L'utilisateur existe déjà."
                });
            }
            // Ici, il faut hacher le mot de passe avant de l'enregistrer dans la base de données.
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            let newAtherant = await AdherentsModels.create({
                nom: nom[0].toUpperCase() + nom.slice(1).toLowerCase(),
                prenom: prenom.toLowerCase(),
                email: email.toLowerCase(),
                password: hashedPassword
            });
            return res.status(201).json({
                error: false,
                message: "Utilisateur créé avec succès.",
                data: {
                    id: newAtherant.id,
                    nom: newAtherant.nom,
                    prenom: newAtherant.prenom,
                    email: newAtherant.email,
                    updatedAt: newAtherant.updatedAt.toISOString().split('T')[0],
                    createdAt: newAtherant.createdAt.toISOString().split('T')[0] 
                }
            });
        }
        catch (error) {
            res.status(500).json({
                error: true,
                message: "Erreur lors de la création de l'utilisateur.",
                data: error
            });
        }
    },
    logout: async function (req, res) {
        const token = req.header("Authorization");
        const payload = tokenService.verifyToken(token);
        if (typeof (payload) === "object") {
            return res.status(payload.status).json({ error: true, message: payload.message })
        }
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'Strict' });

        return res.status(200).json({
            error: false,
            message: "Déconnexion réussie.",
        });ﬁ
    },
};
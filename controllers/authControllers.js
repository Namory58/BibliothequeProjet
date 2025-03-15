
const ServiceDataStructure = require("../middelware/ServiceDataStructure");
const bcrypt = require('bcrypt');
const Atherant = require('../models/Adherents');

module.exports = {
    login: async function (req, res) {

        

        res.status(200).json({
            error: false,
            message: 'Login',
        })
    },
    register: async function (req, res) {
        const allowedKeys =["nom","prenom","email","password"];

        dataStructure.validedChamps(allowedKeys);
          
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
        try {
            const { nom, prenom, email, password } = req.body;
            if(!ServiceDataStructure.isValidName(nom) || nom.length >72){
                return res.status(400).json({
                    error: true,
                    message: "Le nom n'est pas valide."
                });
            }
            if(!ServiceDataStructure.isValidPrenom(prenom) || prenom.length >72){
                return res.status(400).json({
                    error: true,
                    message: "Le prénom n'est pas valide."
                });
            }
            if(!ServiceDataStructure.isValidEmail(email)){
                return res.status(400).json({
                    error: true,
                    message: "L'email n'est pas valide."
                });
            }
            if(!ServiceDataStructure.isValidPassword(password)){
                return res.status(400).json({
                    error: true,
                    message: "Le mot de passe n'est pas valide et la taille de mot de passe doit être de 8 caractères."
                });
            }
            const cheackUser = await Atherant.findOne({where: {email: email}});
            if(cheackUser){
                return res.status(400).json({
                    error: true,
                    message: "l'utilisateur existe déjà."
                });
            }
            // Ici, il faut hacher le mot de passe avant de l'enregistrer dans la base de données.
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

          
            let newAtherant = await Atherant.create({
                nom: nom[0].toUpperCase() + nom.slice(1).toLowerCase(),
                prenom: prenom.toLowerCase(),
                email: email,
                password: hashedPassword
            });
            return res.status(200).json({
                error: false,
                message: "Utilisateur créé avec succès.",
                data: newAtherant
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
        res.status(200).json({
            error: false,
            message: 'Logout',
        })
    },
};
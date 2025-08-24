const express = require("express");
const livreControllers = require("../controllers/livreControllers");

const apiRouterLivres = express.Router();

apiRouterLivres.route('/livres').get(livreControllers.getAllLivres);
apiRouterLivres.route('/livre/:id').get(livreControllers.getLivre);
//apiRouterLivres.route('/livre/:id').put(livreControllers.updateLivre); // Correction ici
//apiRouterLivres.route('/livre/:id').delete(livreControllers.deleteLivre);
//apiRouterLivres.route('/resultat').get(livreControllers.searchLiver);

module.exports = apiRouterLivres;
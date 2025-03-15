const express = require('express');
const ControleurAdherents = require('../controllers/adherentsControllers');

const apiRouterAdherents= express.Router();

apiRouterAdherents.route('/adherents').get(ControleurAdherents.getAlladherents);
apiRouterAdherents.route('/adherents/:id').get(ControleurAdherents.getAdherent);
apiRouterAdherents.route('/adherents').post(ControleurAdherents.createAdherent);
apiRouterAdherents.route('/adherents/:id').put(ControleurAdherents.updateAdherent);
apiRouterAdherents.route('/adherents/:id').delete(ControleurAdherents.deleteAdherent);

module.exports=apiRouterAdherents;

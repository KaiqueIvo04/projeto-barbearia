const Express = require('express');

//Roteador
const serviceRoute = Express.Router();

//Funções

const { createService, 
    getServices, 
    getServiceById, 
    updateService, 
    deleteService } = require('../../controllers/ServiceController/index');

//rotas 

serviceRoute.route('/')
    .get(getServices) 
    .post(createService); 

serviceRoute.route('/:id')
    .get(getServiceById) 
    .patch(updateService) 
    .delete(deleteService) 

module.exports = serviceRoute;
const Express = require('express');

//Roteador
const clientRoute = Express.Router();

//Funções

const { createClient, 
    getClients, 
    getClientById, 
    updateClient, 
    deleteClient } = require('../../controllers/ClientController/index');

//rotas 

clientRoute.route('/')
    .get(getClients) 
    .post(createClient); 

clientRoute.route('/:id')
    .get(getClientById) 
    .patch(updateClient) 
    .delete(deleteClient) 

module.exports = clientRoute;
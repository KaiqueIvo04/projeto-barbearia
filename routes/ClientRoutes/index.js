import { Router } from 'express';

//Roteador
const clientRoute = Router();

//Funções

import { createClient, 
    getClients, 
    getClientById, 
    updateClient, 
    deleteClient } from '../../controllers/ClientController/index';

//rotas 

clientRoute.route('/')
    .get(getClients) 
    .post(createClient); 

clientRoute.route('/:id')
    .get(getClientById) 
    .patch(updateClient) 
    .delete(deleteClient) 

export default clientRoute;
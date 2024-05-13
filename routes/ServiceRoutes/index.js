import { Router } from 'express';

//Roteador
const serviceRoute = Router();

//Funções

import { createService, 
    getServices, 
    getServiceById, 
    updateService, 
    deleteService } from '../../controllers/ServiceController/index';

//rotas 

serviceRoute.route('/')
    .get(getServices) 
    .post(createService); 

serviceRoute.route('/:id')
    .get(getServiceById) 
    .patch(updateService) 
    .delete(deleteService) 

export default serviceRoute;
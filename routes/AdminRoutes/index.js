import { Router } from 'express';

//Roteador
const adminRoute = Router();

//Funções

import { createAdmin, 
    getAdmins, 
    getAdminById, 
    updateAdmin, 
    deleteAdmin } from '../../controllers/AdminController/index';

//rotas 

adminRoute.route('/')
    .get(getAdmins) 
    .post(createAdmin); 

adminRoute.route('/:id')
    .get(getAdminById) 
    .patch(updateAdmin) 
    .delete(deleteAdmin) 

export default adminRoute;
const Express = require('express');

//Roteador
const adminRoute = Express.Router();

//Funções

const { createAdmin, 
    getAdmins, 
    getAdminById, 
    updateAdmin, 
    deleteAdmin } = require('../../controllers/AdminController/index');

//rotas 

adminRoute.route('/')
    .get(getAdmins) 
    .post(createAdmin); 

adminRoute.route('/:id')
    .get(getAdminById) 
    .patch(updateAdmin) 
    .delete(deleteAdmin) 

module.exports = adminRoute;
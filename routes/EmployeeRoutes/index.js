import { Router } from 'express';

//Roteador
const employeeRoute = Router();

//Funções

import { createEmployee, 
    getEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee } from '../../controllers/EmployeeController/index';

//rotas 

employeeRoute.route('/')
    .get(getEmployees) 
    .post(createEmployee); 

employeeRoute.route('/:id')
    .get(getEmployeeById) 
    .patch(updateEmployee) 
    .delete(deleteEmployee) 

export default employeeRoute;
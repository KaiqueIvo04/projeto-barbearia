const Express = require('express');

//Roteador
const employeeRoute = Express.Router();

//Funções

const { createEmployee, 
    getEmployees, 
    getEmployeeById, 
    updateEmployee, 
    deleteEmployee } = require('../../controllers/EmployeeController/index');

//rotas 

employeeRoute.route('/')
    .get(getEmployees) 
    .post(createEmployee); 

employeeRoute.route('/:id')
    .get(getEmployeeById) 
    .patch(updateEmployee) 
    .delete(deleteEmployee) 

module.exports = employeeRoute;
const Express = require('express');

//Roteador
const authRoute = Express.Router();


//-------------Funções para Login------------------
const { getMe, protect, login, register } = require('../../controllers/AuthController/index');
const { getAdminById } = require('../../controllers/AdminController');
const { getEmployeeById } = require('../../controllers/EmployeeController');
const { getClientById } = require('../../controllers/ClientController');

authRoute.route('/login')
    .post(login);

authRoute.route('/register')
    .post(register);

//Rota privada (Falta os outros usuários)
authRoute.route('/me')
    .get(protect, getMe, getAdminById, getEmployeeById, getClientById); //Quando terminar o front tentar excluir isso e usar o JWT decode

module.exports = authRoute;




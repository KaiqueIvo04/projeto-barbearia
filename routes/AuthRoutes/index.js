import Express from 'express'

//-----------------Roteador-----------------
const authRoute = Express.Router();

//-------------Funções para Login------------------
import { getMe, protect, login, register } from '../../controllers/AuthController/index';
import { getMedicById } from '../../controllers/MedicController';

authRoute.route('/login')
    .post(login);

authRoute.route('/register')
    .post(register);

//Rota privada
authRoute.route('/me')
    .get(protect, getMe, getMedicById);

module.exports = authRoute;




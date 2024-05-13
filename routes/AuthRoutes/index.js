import Express from 'express'

//-----------------Roteador-----------------
const authRoute = Express.Router();

//-------------Funções para Login------------------
import { getMe, protect, login, register } from '../../controllers/AuthController/index';
import { getAdminById } from '../../controllers/AdminController';

authRoute.route('/login')
    .post(login);

authRoute.route('/register')
    .post(register);

//Rota privada (Falta os outros usuários)
authRoute.route('/me')
    .get(protect, getMe, getAdminById); //Quando terminar o front tentar excluir isso e usar o JWT decode

export default authRoute;




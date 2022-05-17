import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginMiddleware from '../middlewares/login.middleware';

const loginController = new LoginController();
const loginMiddleware = new LoginMiddleware();

const route = Router();

route.post('/', loginMiddleware.validateLogin, loginController.login);

export default route;
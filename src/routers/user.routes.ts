import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserMiddleware from '../middlewares/user.middleware';

const userController = new UserController();
const userMiddleware = new UserMiddleware();

const route = Router();

route.post('/', userMiddleware.validateUser, userController.create);

export default route;
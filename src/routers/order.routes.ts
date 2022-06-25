import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import TokenMiddleware from '../middlewares/token.middleware';

const orderController = new OrderController();
const tokenValidate = new TokenMiddleware();

const route = Router();

route.get('/', orderController.getAll);
route.post('/', tokenValidate.authentication, orderController.create);

export default route;
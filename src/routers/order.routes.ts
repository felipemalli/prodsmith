import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import OrderMiddleware from '../middlewares/order.middleware';
import TokenMiddleware from '../middlewares/token.middleware';

const orderController = new OrderController();
const orderMiddleware = new OrderMiddleware();
const tokenValidate = new TokenMiddleware();

const route = Router();

route.get('/', orderController.getAll);
route.post(
  '/', 
  tokenValidate.authentication, 
  orderMiddleware.validateOrder,
  orderController.create,
);

export default route;
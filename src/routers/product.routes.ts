import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ProductMiddleware from '../middlewares/product.middleware';

const productController = new ProductController();
const productMiddleware = new ProductMiddleware();

const route = Router();

route.get('/', productController.getAll);
route.post('/', productMiddleware.validateProduct, productController.create);

export default route;
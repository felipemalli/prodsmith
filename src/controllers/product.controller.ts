import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/product.service';

export default class ProductController {
  public service = new ProductService();

  public getAll = async (_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const products = await this.service.getAll();
      return res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  };

  public getByOrderId = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    const { orderId } = req.body;
    try {
      const products = await this.service.getByOrderId(orderId);
      return res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    const { name, amount } = req.body;
    try {
      const product = await this.service.create(name, amount);
      return res.status(StatusCodes.CREATED).json(product);
    } catch (error: unknown) {
      next(error);
    }
  };
}
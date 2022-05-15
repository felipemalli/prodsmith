import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/order.service';

export default class OrderController {
  public service = new OrderService();

  public getAll = async (_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const orders = await this.service.getAll();
      return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      next(error);
    }
  };

  // public create = async (req: Request, res: Response, next: NextFunction): 
  // Promise<Response | void> => {
  //   const { name, amount } = req.body;
  //   try {
  //     const order = await this.service.create(name, amount);
  //     return res.status(StatusCodes.CREATED).json(order);
  //   } catch (error: unknown) {
  //     next(error);
  //   }
  // };
}
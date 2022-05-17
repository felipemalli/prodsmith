import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/login.service';

export default class OrderController {
  public service = new OrderService();

  public login = async (req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    const { username, password } = req.body;
    try {
      const token = await this.service.login(username, password);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
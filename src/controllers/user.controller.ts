import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

export default class UserController {
  public service = new UserService();

  public getAll = async (_req: Request, res: Response, next: NextFunction):
  Promise<Response | void> => {
    try {
      const users = await this.service.getAll();
      return res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): 
  Promise<Response | void> => {
    const { username, classe, level, password } = req.body;
    try {
      const token = await this.service.create(username, classe, level, password);
      return res.status(StatusCodes.CREATED).json({ token });
    } catch (error: unknown) {
      next(error);
    }
  };
}
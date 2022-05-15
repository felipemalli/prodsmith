import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/user.service';

export default class UserController {
  public service = new UserService();

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
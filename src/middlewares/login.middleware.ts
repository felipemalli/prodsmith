import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class LoginMiddleware {
  public LoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  public validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.LoginSchema.validate(req.body);
    if (error) {
      if (error.details[0].type === 'any.required') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: error.message });
    }
    next();
  };
}

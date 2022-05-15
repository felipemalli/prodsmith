import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class UserMiddleware {
  public userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    classe: Joi.string().min(3).required(),
    level: Joi.number().min(1).required(),
    password: Joi.string().min(8).required(),
  });

  public validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.userSchema.validate(req.body);
    if (error) {
      if (error.details[0].type === 'any.required') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
    }
    next();
  };
}

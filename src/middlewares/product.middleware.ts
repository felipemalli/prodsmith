import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class ProductMiddleware {
  public productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    amount: Joi.string().min(3).required(),
  });

  public validateProduct = (req: Request, res: Response, next: NextFunction) => {
    const { error } = this.productSchema.validate(req.body);
    if (error) {
      if (error.details[0].type === 'any.required') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
    }
    next();
  };
}

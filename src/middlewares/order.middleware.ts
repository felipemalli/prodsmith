import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default class ProductMiddleware {
  public orderSchema = Joi.object({
    productsIds: Joi.array().items(Joi.number().greater(0).required()).required(),
  });

  public validateOrder = (req: Request, res: Response, next: NextFunction) => {
    const { productsIds } = req.body;
    const { error } = this.orderSchema.validate({ productsIds });

    if (error) {
      if (error.details[0].type === 'any.required') {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
      }

      if (error.details[0].type === 'array.includesRequiredUnknowns') {
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ message: '"productsIds" must include only numbers' });
      }

      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ message: error.message });
    }

    next();
  };
}

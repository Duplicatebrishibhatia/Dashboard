import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

const itemSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid('active', 'inactive'),
  tags: Joi.array().items(Joi.string()),
});

export const validateItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = itemSchema.validate(req.body);
  if (error) {
    throw new AppError(error.details[0].message, 400);
  }
  next();
}; 
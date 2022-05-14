import express, { NextFunction, Request, Response } from 'express';
import productRoutes from './routers/product.routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(500);
  next();
});

export default app;

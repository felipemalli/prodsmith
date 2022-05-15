import express, { NextFunction, Request, Response } from 'express';
import productRoutes from './routers/product.routes';
import userRoutes from './routers/user.routes';
import orderRoutes from './routers/order.routes';
// import loginRoutes from './routers/login.routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
// app.use('/login', loginRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as never;
  console.log(`name: ${name}`);
  console.log(`message: ${message}`);
  console.log(`details: ${details}`);
  res.sendStatus(500);
  next();
});

export default app;

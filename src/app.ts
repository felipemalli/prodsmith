import express from 'express';
import productRoutes from './routers/product.routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);

export default app;

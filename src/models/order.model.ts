// import { ResultSetHeader } from 'mysql2/promise';
import conn from './connection';
import IOrder from '../interfaces/order.interface';
import ProductModel from './product.model';

export default class OrderModel {
  public productModel = new ProductModel();

  public getAll = async ():Promise<IOrder[]> => {
    const [rows] = await conn.execute('SELECT * FROM Trybesmith.Orders');
    const orders = rows as IOrder[];

    const allProducts = await Promise.all(orders
      .map(((order) => this.productModel.getByOrderId(order.id))));

    const productsIds = allProducts.map((order) => order.map((product) => product.id));

    return orders.map((order, i) => ({
      ...order,
      productsIds: productsIds[i],
    }));
  };

  // public create = async (name: string, amount: string): Promise<IOrder> => {
  //   const [product] = await conn.execute<ResultSetHeader>(
  //     'INSERT INTO Trybesmith.Orders (name, amount) values (?, ?);',
  //     [name, amount],
  //   );
  //   return { id: product.insertId, name, amount };
  // };
}
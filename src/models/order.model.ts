import { ResultSetHeader } from 'mysql2';
import conn from './connection';
import IOrder from '../interfaces/order.interface';
import ProductModel from './product.model';

export default class OrderModel {
  public productModel = new ProductModel();

  public getAll = async ():Promise<IOrder[]> => {
    const [ordersArray] = await conn.execute('SELECT * FROM Trybesmith.Orders');
    const orders = ordersArray as IOrder[];

    const allProducts = await Promise.all(orders
      .map(((order) => this.productModel.getByOrderId(order.id)))); 
      /*
      Other solution:
      `SELECT o.id, o.userId, pr.id AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS pr
      ON o.id = pr.orderId;`
      */

    const productsIds = allProducts.map((order) => order.map((product) => product.id));

    return orders.map((order, i) => ({
      ...order,
      productsIds: productsIds[i],
    }));
  };

  public create = async (userId: number): Promise<number> => {
    const [{ insertId }] = await conn.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders(userId) VALUES (?);',
      [userId],
    );
    return insertId as number;
  };
}
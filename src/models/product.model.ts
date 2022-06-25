import { ResultSetHeader } from 'mysql2/promise';
import conn from './connection';
import IProduct from '../interfaces/product.interface';

export default class ProductModel {
  public getAll = async (): Promise<IProduct[]> => {
    const [product] = await conn.execute('SELECT * FROM Trybesmith.Products');
    return product as IProduct[];
  };

  public getByOrderId = async (orderId: number): Promise<IProduct[]> => {
    const [product] = await conn.execute(
      'SELECT * FROM Trybesmith.Products WHERE orderId = ?',
      [orderId],
    );
    return product as IProduct[];
  };

  public create = async (name: string, amount: string): Promise<IProduct> => {
    const [product] = await conn.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) values (?, ?);',
      [name, amount],
    );
    return { id: product.insertId, name, amount };
  };

  public update = async (orderId: number, id: number): Promise<void> => {
    await conn.execute(
      `UPDATE Trybesmith.Products SET
      orderId = ? WHERE id = ?;`,
      [orderId, id],
    );
  };
}
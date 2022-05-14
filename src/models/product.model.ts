import { ResultSetHeader } from 'mysql2/promise';
import conn from '../database/connection';
import IProduct from '../interfaces/product.interface';

export default class ProductModel {
  public getAll = async (): Promise<IProduct[]> => {
    const [product] = await conn.execute('SELECT * FROM Trybesmith.Products');
    return product as IProduct[];
  };

  public create = async (name: string, amount: string): Promise<IProduct> => {
    const [product] = await conn.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount, orderId) values (?, ?, ?);',
      [name, amount],
    );
    return { id: product.insertId, name, amount };
  };
}
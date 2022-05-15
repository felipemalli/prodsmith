import { ResultSetHeader } from 'mysql2/promise';
import conn from './connection';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  public create = async (username: string, classe: string, level: number, password: string):
  Promise<IUser> => {
    const [user] = await conn.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) values (?, ?, ?, ?);',
      [username, classe, level, password],
    );
    return { id: user.insertId, username, classe, level, password };
  };
}
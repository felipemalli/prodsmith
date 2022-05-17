import conn from './connection';
import IUser from '../interfaces/user.interface';

export default class LoginModel {
  public login = async (username: string, password: string):
  Promise<IUser> => {
    const [userArray] = await conn.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    const [user] = userArray as IUser[];
    return user as IUser;
  };
}
import jwt from 'jsonwebtoken';
import LoginModel from '../models/login.model';

const secretKey = 'process.env.JWT_SECRET';

export default class LoginService {
  public model = new LoginModel();
  
  public login = async (username: string, password: string):
  Promise<string> => {
    const id = await this.model.login(username, password);

    if (!id) throw new Error('Username or password invalid');

    const token = jwt.sign({ id }, secretKey, { expiresIn: '7d', algorithm: 'HS256' });
    return token;
  };
}
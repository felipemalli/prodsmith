import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

const secretKey = 'process.env.JWT_SECRET';

export default class UserService {
  public model = new UserModel();
  
  public create = async (username: string, classe: string, level: number, password: string):
  Promise<string> => {
    const { id } = await this.model.create(username, classe, level, password);
    
    const token = jwt.sign({ id }, secretKey, { expiresIn: '7d', algorithm: 'HS256' });
    return token;
  };
}
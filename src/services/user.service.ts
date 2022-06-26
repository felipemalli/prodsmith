import UserModel from '../models/user.model';
import TokenMiddleware from '../middlewares/token.middleware';
import IUser from '../interfaces/user.interface';

export default class UserService {
  public model = new UserModel();
  
  public tokenMiddleware = new TokenMiddleware();

  public getAll = async (): Promise<IUser[]> => {
    const products = await this.model.getAll();
    return products;
  };
  
  public create = async (username: string, classe: string, level: number, password: string):
  Promise<string> => {
    const { id } = await this.model.create(username, classe, level, password);

    if (!id) throw new Error('Username or password invalid');

    const token = this.tokenMiddleware.generateToken(id, '7d');

    return token;
  };
}
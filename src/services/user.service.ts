import UserModel from '../models/user.model';
import IProduct from '../interfaces/product.interface';
import TokenMiddleware from '../middlewares/token.middleware';

export default class UserService {
  public model = new UserModel();
  
  public tokenMiddleware = new TokenMiddleware();

  public getAll = async (): Promise<IProduct[]> => {
    const products = await this.model.getAll();
    return products;
  };
  
  public create = async (username: string, classe: string, level: number, password: string):
  Promise<string> => {
    const { id } = await this.model.create(username, classe, level, password);
    
    const token = this.tokenMiddleware.generateToken({ id }, '7d');

    return token;
  };
}
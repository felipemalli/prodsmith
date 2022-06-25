import UserModel from '../models/user.model';
import TokenMiddleware from '../middlewares/token.middleware';

export default class UserService {
  public model = new UserModel();
  
  public tokenMiddleware = new TokenMiddleware();
  
  public create = async (username: string, classe: string, level: number, password: string):
  Promise<string> => {
    const { id } = await this.model.create(username, classe, level, password);
    
    const token = this.tokenMiddleware.generateToken({ id }, '7d');

    return token;
  };
}
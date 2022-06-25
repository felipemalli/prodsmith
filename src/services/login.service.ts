import LoginModel from '../models/login.model';
import TokenMiddleware from '../middlewares/token.middleware';

export default class LoginService {
  public model = new LoginModel();

  public tokenMiddleware = new TokenMiddleware();
  
  public login = async (username: string, password: string):
  Promise<string> => {
    const id = await this.model.login(username, password);

    if (!id) throw new Error('Username or password invalid');

    const token = this.tokenMiddleware.generateToken({ id }, '7d');

    return token;
  };
}
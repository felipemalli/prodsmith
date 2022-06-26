import LoginModel from '../models/login.model';
import TokenMiddleware from '../middlewares/token.middleware';

export default class LoginService {
  public model = new LoginModel();

  public tokenMiddleware = new TokenMiddleware();
  
  public login = async (username: string, password: string):
  Promise<string> => {
    const user = await this.model.login(username, password);

    if (!user || !user.id) throw new Error('Username or password invalid');

    const token = this.tokenMiddleware.generateToken(user.id, '7d');

    return token;
  };
}
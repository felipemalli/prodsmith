import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class TokenMiddleware {
  private JWT_SECRET = 'secretPassword';

  public generateToken(paramsToStore = {}, expireTime = '1h'): string {
    return jwt.sign(paramsToStore, this.JWT_SECRET, { expiresIn: expireTime, algorithm: 'HS256' });
  }

  public tokenValidate(token: string) {
    return jwt.verify(token, this.JWT_SECRET);
  }

  public authentication = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      this.tokenValidate(authorization);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
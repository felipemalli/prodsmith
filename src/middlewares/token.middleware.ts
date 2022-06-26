import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export default class TokenMiddleware {
  private secret = process.env.JWT_SECRET || '';

  public generateToken(userId: number, expireTime = '1h'): string {
    return jwt.sign({ userId }, this.secret, { expiresIn: expireTime, algorithm: 'HS256' });
  }

  public tokenValidate(token: string) {
    return jwt.verify(token, this.secret);
  }

  public authentication = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const payload = this.tokenValidate(authorization);
      req.body.user = payload;
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
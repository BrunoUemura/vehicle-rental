import { Request } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '@src/util/error/UnauthorizedError';

export default class AuthValidation {
  public static async validate(request: Request) {
    try {
      await this.validateToken(request);
    } catch (error) {
      throw error;
    }
  }

  private static async validateToken(request: Request) {
    const { authorization } = request.headers;
    if (!authorization) throw new UnauthorizedError('Missing JWT token');

    const token = authorization.replace('Bearer', '').trim();
    if (!token) throw new UnauthorizedError('Missing JWT token');

    try {
      jwt.verify(token, String(process.env.JWT_SECRET));
    } catch (error) {
      throw new UnauthorizedError('Invalid JWT token');
    }

    const result = jwt.decode(token);
  }

  public static async retrieveToken(request: Request) {
    const { authorization } = request.headers;
    const token = authorization.replace('Bearer', '').trim();
    return jwt.decode(token);
  }
}

import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { CustomError } from '@src/util/error/CustomError';

export default class UnauthorizedError extends CustomError {
  statusCode = HttpStatusCodes.UNAUTHORIZED;
  where = 'Authentication';

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ where: this.where, message: this.message }];
  }
}

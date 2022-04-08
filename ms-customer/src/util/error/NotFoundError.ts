import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { CustomError } from '@src/util/error/CustomError';

export default class NotFoundError extends CustomError {
  statusCode = HttpStatusCodes.NOT_FOUND;
  where: string;

  constructor(where: string, public message: string) {
    super(message);
    this.where = where;
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ where: this.where, message: this.message }];
  }
}

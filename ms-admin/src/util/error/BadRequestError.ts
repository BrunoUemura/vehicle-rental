import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { CustomError } from '@src/util/error/CustomError';

export default class BadRequestError extends CustomError {
  statusCode = HttpStatusCodes.BAD_REQUEST;
  where: string;

  constructor(where: string, public message: string) {
    super(message);
    this.where = where;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ where: this.where, message: this.message }];
  }
}

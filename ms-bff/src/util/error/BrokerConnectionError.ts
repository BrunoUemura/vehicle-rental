import HttpStatusCodes from '@src/util/enum/HttpStatusCodes';
import { CustomError } from '@src/util/error/CustomError';

export default class BrokerConnectionError extends CustomError {
  statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  where = 'Message Broker';

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BrokerConnectionError.prototype);
  }

  serializeErrors() {
    return [{ where: this.where, message: this.message }];
  }
}

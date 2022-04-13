export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract where: string;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    where: string;
    message: string;
    field?: string;
  }[];
}

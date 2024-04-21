export class CustomError extends Error {
    statusCode: number;
  
    constructor(statusCode: number, message: string) {
      super(message);
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, CustomError.prototype);
    }
  }
  
  export const errorHandler = (
    statusCode: number,
    message: string
  ): CustomError => {
    const error: CustomError = new CustomError(statusCode, message);
    return error;
  };
  
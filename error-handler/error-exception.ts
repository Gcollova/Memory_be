import { ErrorCode } from './error-code';

export class ErrorException extends Error {
  public status: number = null!;
  public metaData: any = null;
  constructor(code: string = ErrorCode.UnknownError, metaData: any = null) {
    super(code);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.metaData = metaData;
    switch (code) {
      case ErrorCode.ValidationError:
        this.status = 406;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      default:
        this.status = 500;
        break;
    }
  }
}
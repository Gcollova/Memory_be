"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorException = void 0;
const error_code_1 = require("./error-code");
class ErrorException extends Error {
    constructor(code = error_code_1.ErrorCode.UnknownError, metaData = null) {
        super(code);
        this.status = null;
        this.metaData = null;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = code;
        this.status = 500;
        this.metaData = metaData;
        switch (code) {
            case error_code_1.ErrorCode.ValidationError:
                this.status = 406;
                break;
            case error_code_1.ErrorCode.NotFound:
                this.status = 404;
                break;
            default:
                this.status = 500;
                break;
        }
    }
}
exports.ErrorException = ErrorException;

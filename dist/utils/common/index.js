"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = exports.ErrorResponse = void 0;
const error_response_1 = require("./error-response");
Object.defineProperty(exports, "ErrorResponse", { enumerable: true, get: function () { return error_response_1.error; } });
const success_response_1 = require("./success-response");
Object.defineProperty(exports, "SuccessResponse", { enumerable: true, get: function () { return success_response_1.success; } });

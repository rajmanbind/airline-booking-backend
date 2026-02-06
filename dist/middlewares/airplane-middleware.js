"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateCreateRequest;
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
const app_error_1 = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const { modelNumber, capacity } = req.body;
    if (!modelNumber || typeof modelNumber !== 'string') {
        // ErrorResponse.message='Something went wrong while creating airplane';
        common_1.ErrorResponse.error = new app_error_1.AppError(['Model Number not found or invalid'], http_status_codes_1.StatusCodes.BAD_REQUEST);
        return res.
            status(http_status_codes_1.StatusCodes.BAD_REQUEST).
            json(common_1.ErrorResponse);
    }
    if (!capacity || typeof capacity !== 'number' || capacity <= 0) {
        // ErrorResponse.message='Something went wrong while creating airplane';
        common_1.ErrorResponse.error = new app_error_1.AppError(['Capacity not found or invalid'], http_status_codes_1.StatusCodes.BAD_REQUEST);
        return res.
            status(http_status_codes_1.StatusCodes.BAD_REQUEST).
            json(common_1.ErrorResponse);
    }
    next();
}

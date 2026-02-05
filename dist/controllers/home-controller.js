"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const HomeController = {
    async home(req, res) {
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Welcome to Home API",
            error: {},
            data: {}
        });
    },
};
exports.default = HomeController;

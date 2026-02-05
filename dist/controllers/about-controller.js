"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AboutController = {
    async about(req, res) {
        res.status(200).json({
            success: true,
            message: "Welcome to About API",
            error: {},
            data: {}
        });
    },
};
exports.default = AboutController;

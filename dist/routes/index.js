"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const v1_1 = __importDefault(require("./v1"));
const v2_1 = __importDefault(require("./v2"));
const apiRoutes = express_1.default.Router();
// API info endpoint
apiRoutes.get("/", (req, res) => {
    res.json({
        message: "Flight Booking API",
        version: "1.0.0"
    });
});
apiRoutes.use("/v1", v1_1.default);
apiRoutes.use("/v2", v2_1.default);
exports.default = apiRoutes;

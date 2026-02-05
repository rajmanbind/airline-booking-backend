"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const models_1 = require("./models");
// Create app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Mount router 
app.use("/api", routes_1.default);
// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString()
    });
});
// Database connection and server start
const startServer = async () => {
    try {
        // Test database connection
        await models_1.sequelize.authenticate();
        config_1.Logger.info("✅ Database connection established successfully");
        // Run migrations instead of using sequelize.sync in environments
        try {
            const { runMigrations } = await Promise.resolve().then(() => __importStar(require('./utils/migrate')));
            await runMigrations();
            config_1.Logger.info('✅ Database migrations applied');
        }
        catch (mErr) {
            config_1.Logger.error('❌ Migration error:', mErr);
            throw mErr;
        }
        // Start server
        app.listen(config_1.ServerConfig.PORT, () => {
            config_1.Logger.info(`🚀 Server started on PORT: ${config_1.ServerConfig.PORT}`);
        });
    }
    catch (error) {
        config_1.Logger.error("❌ Unable to start server:", error);
        process.exit(1);
    }
};
// Start the server
startServer();
// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
    config_1.Logger.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});
// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
    config_1.Logger.error("Uncaught Exception:", error);
    process.exit(1);
});
exports.default = app;

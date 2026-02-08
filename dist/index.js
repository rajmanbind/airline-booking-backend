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
const middlewares_1 = require("./middlewares");
// Create app
const app = (0, express_1.default)();
// Trust proxy - enables correct IP tracking behind load balancer/proxy
// Critical for rate limiting to work correctly in production
if (config_1.ServerConfig.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // Trust first proxy (NGINX, CloudFlare, AWS ALB)
}
// Security + Middleware
(0, middlewares_1.applySecurity)(app);
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
// Error handler (after routes)
app.use(middlewares_1.errorHandler);
// Database connection and server start with graceful shutdown
const startServer = async () => {
    let server = null;
    try {
        // Test database connection
        await models_1.sequelize.authenticate();
        config_1.Logger.info("✅ Database connection established successfully");
        // Optionally run migrations at startup (useful for single-instance deployments)
        if (config_1.ServerConfig.RUN_MIGRATIONS_AT_STARTUP) {
            try {
                const { runMigrations } = await Promise.resolve().then(() => __importStar(require('./utils/migrate')));
                await runMigrations();
                config_1.Logger.info('✅ Database migrations applied');
            }
            catch (mErr) {
                config_1.Logger.error('❌ Migration error:', mErr);
                throw mErr;
            }
        }
        else {
            config_1.Logger.info('🔁 Skipping automatic migrations at startup');
        }
        // Start server and keep reference
        server = app.listen(config_1.ServerConfig.PORT, () => {
            config_1.Logger.info(`🚀 Server started on PORT: ${config_1.ServerConfig.PORT}`);
        });
    }
    catch (error) {
        config_1.Logger.error("❌ Unable to start server:", error);
        // attempt graceful shutdown if server started
        if (server) {
            server.close(() => {
                config_1.Logger.info('Server closed after failed start');
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    }
    // Graceful shutdown helper
    const gracefulShutdown = async (signal, err) => {
        try {
            config_1.Logger.info(`Received ${signal}. Shutting down gracefully...`);
            if (server) {
                server.close(() => config_1.Logger.info('HTTP server closed'));
            }
            await models_1.sequelize.close();
            config_1.Logger.info('Database connection closed');
            if (err)
                config_1.Logger.error('Shutdown due to error:', err);
            // Allow platforms/tools (like nodemon) that send SIGUSR2 to restart the process.
            // For SIGUSR2 we perform cleanup but do NOT call `process.exit` so the
            // caller can re-signal the process (e.g. `process.kill(pid, 'SIGUSR2')`).
            if (signal === 'SIGUSR2') {
                config_1.Logger.info('Not exiting process for SIGUSR2 (hot restart)');
                return;
            }
            process.exit(0);
        }
        catch (shutdownErr) {
            config_1.Logger.error('Error during graceful shutdown', shutdownErr);
            process.exit(1);
        }
    };
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
        config_1.Logger.error('Unhandled Rejection at:', reason);
        // Try graceful shutdown then exit
        gracefulShutdown('unhandledRejection', reason instanceof Error ? reason : undefined);
    });
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
        config_1.Logger.error('Uncaught Exception:', error);
        gracefulShutdown('uncaughtException', error instanceof Error ? error : undefined);
    });
    // Handle common system signals for graceful shutdown
    const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP'];
    signals.forEach((sig) => {
        process.on(sig, () => {
            config_1.Logger.info(`Received ${sig}`);
            // fire-and-forget graceful shutdown
            void gracefulShutdown(sig);
        });
    });
    // Special-case for nodemon and some debuggers which use SIGUSR2 to restart
    process.once('SIGUSR2', async () => {
        config_1.Logger.info('Received SIGUSR2 (restart). Shutting down gracefully for restart...');
        await gracefulShutdown('SIGUSR2');
        // Re-signal the process to allow the restarter to continue (e.g., nodemon)
        process.kill(process.pid, 'SIGUSR2');
    });
};
// Start the server
startServer();
exports.default = app;

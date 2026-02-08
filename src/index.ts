
import express from "express";
import apiRoutes from "./routes";
import { ServerConfig, Logger } from "./config";
import { sequelize } from "./models";
import { applySecurity, errorHandler } from "./middlewares";

// Create app
const app = express();

// Trust proxy - enables correct IP tracking behind load balancer/proxy
// Critical for rate limiting to work correctly in production
if (ServerConfig.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Trust first proxy (NGINX, CloudFlare, AWS ALB)
}

// Security + Middleware
applySecurity(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount router 
app.use("/api", apiRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "Server is running",
    timestamp: new Date().toISOString() 
  });
});

// Error handler (after routes)
app.use(errorHandler);

// Database connection and server start with graceful shutdown
const startServer = async () => {
  let server: ReturnType<typeof app.listen> | null = null;
  try {
    // Test database connection
    await sequelize.authenticate();
    Logger.info("✅ Database connection established successfully");

    // Optionally run migrations at startup (useful for single-instance deployments)
    if (ServerConfig.RUN_MIGRATIONS_AT_STARTUP) {
      try {
        const { runMigrations } = await import('./utils/migrate');
        await runMigrations();
        Logger.info('✅ Database migrations applied');
      } catch (mErr) {
        Logger.error('❌ Migration error:', mErr);
        throw mErr;
      }
    } else {
      Logger.info('🔁 Skipping automatic migrations at startup');
    }

    // Start server and keep reference
    server = app.listen(ServerConfig.PORT, () => {
      Logger.info(`🚀 Server started on PORT: ${ServerConfig.PORT}`);
    });
  } catch (error) {
    Logger.error("❌ Unable to start server:", error);
    // attempt graceful shutdown if server started
    if (server) {
      server.close(() => {
        Logger.info('Server closed after failed start');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }

  // Graceful shutdown helper
  const gracefulShutdown = async (signal: string, err?: Error) => {
    try {
      Logger.info(`Received ${signal}. Shutting down gracefully...`);
      if (server) {
        server.close(() => Logger.info('HTTP server closed'));
      }
      await sequelize.close();
      Logger.info('Database connection closed');
      if (err) Logger.error('Shutdown due to error:', err);
      // Allow platforms/tools (like nodemon) that send SIGUSR2 to restart the process.
      // For SIGUSR2 we perform cleanup but do NOT call `process.exit` so the
      // caller can re-signal the process (e.g. `process.kill(pid, 'SIGUSR2')`).
      if (signal === 'SIGUSR2') {
        Logger.info('Not exiting process for SIGUSR2 (hot restart)');
        return;
      }
      process.exit(0);
    } catch (shutdownErr) {
      Logger.error('Error during graceful shutdown', shutdownErr);
      process.exit(1);
    }
  };

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: any) => {
    Logger.error('Unhandled Rejection at:', reason);
    // Try graceful shutdown then exit
    gracefulShutdown('unhandledRejection', reason instanceof Error ? reason : undefined);
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error: any) => {
    Logger.error('Uncaught Exception:', error);
    gracefulShutdown('uncaughtException', error instanceof Error ? error : undefined);
  });

  // Handle common system signals for graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT', 'SIGHUP'];
  signals.forEach((sig) => {
    process.on(sig, () => {
      Logger.info(`Received ${sig}`);
      // fire-and-forget graceful shutdown
      void gracefulShutdown(sig);
    });
  });

  // Special-case for nodemon and some debuggers which use SIGUSR2 to restart
  process.once('SIGUSR2', async () => {
    Logger.info('Received SIGUSR2 (restart). Shutting down gracefully for restart...');
    await gracefulShutdown('SIGUSR2');
    // Re-signal the process to allow the restarter to continue (e.g., nodemon)
    process.kill(process.pid, 'SIGUSR2');
  });
};

// Start the server
startServer();
export default app;
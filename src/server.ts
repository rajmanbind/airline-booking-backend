import express from "express";
import apiRoutes from "./routes";
import { ServerConfig, Logger, sequelize } from "./config";
import models from "./models";

// Create app
const app = express();

// Middleware to parse JSON
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

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    Logger.info("✅ Database connection established successfully");
    console.log("✅ Database connected");

    // Sync models (only in development - use migrations in production)
    if (ServerConfig.NODE_ENV === "development") {
      await sequelize.sync({ alter: false });
      Logger.info("✅ Database models synchronized");
    }

    // Start server
    app.listen(ServerConfig.PORT, () => {
      console.log(`🚀 Server successfully started on PORT: ${ServerConfig.PORT}`);
      Logger.info(`🚀 Server successfully started on PORT: ${ServerConfig.PORT}`);
      Logger.info(`📝 Environment: ${ServerConfig.NODE_ENV}`);
    });
  } catch (error) {
    Logger.error("❌ Unable to start server:", error);
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  Logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  Logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Start the server
startServer();

export default app;
import express from "express";
import apiRoutes from "./routes";
import { ServerConfig, Logger } from "./config";

// Create app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mount router 
app.use("/api", apiRoutes);

// Define PORT
app.listen(ServerConfig.PORT, () => {
   console.log(`🚀 Server successfully started on PORT: ${ServerConfig.PORT}`);
   Logger.info(`🚀 Server successfully started server`);
});

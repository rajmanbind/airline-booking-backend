import express from "express";
import v1Router from "./v1";
import v2Router from "./v2";
const apiRoutes = express.Router();

apiRoutes.use("/v1", v1Router)
apiRoutes.use("/v2", v2Router)

export default apiRoutes;
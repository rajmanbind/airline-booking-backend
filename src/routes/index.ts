import express,{Request,Response} from "express";
import v1Router from "./v1";
import v2Router from "./v2";
const apiRoutes = express.Router();


// API info endpoint
apiRoutes.get("/", (req:Request, res:Response) => {
  res.json({
    message: "Flight Booking API",
    version: "1.0.0",
    endpoints: {
      airplanes: "/api",
      health: "/health",
    },
  });
});
apiRoutes.use("/v1", v1Router)
apiRoutes.use("/v2", v2Router)

export default apiRoutes;
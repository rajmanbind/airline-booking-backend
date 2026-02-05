import {Router} from "express";
import { AirplaneController } from "../../controllers/airplane-controller";

const airPlaneRouter = Router();

airPlaneRouter.post("/", AirplaneController.createAirplane);
airPlaneRouter.get("/", AirplaneController.getAll);
airPlaneRouter.get("/:id", AirplaneController.getAirplaneById);
airPlaneRouter.put("/:id", AirplaneController.update);
airPlaneRouter.delete("/:id", AirplaneController.delete);

export default airPlaneRouter;
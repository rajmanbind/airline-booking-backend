import {Router} from "express";
import { AirplaneController } from "../../controllers/airplane-controller";
import validateCreateRequest from "../../middlewares/airplane-middleware";
import asyncHandler from "../../utils/async-handler";

const airPlaneRouter = Router();

airPlaneRouter.post("/", validateCreateRequest, asyncHandler(AirplaneController.createAirplane));
airPlaneRouter.get("/", asyncHandler(AirplaneController.getAll));
airPlaneRouter.get("/:id", asyncHandler(AirplaneController.getAirplaneById));
airPlaneRouter.put("/:id", asyncHandler(AirplaneController.update));
airPlaneRouter.delete("/:id", asyncHandler(AirplaneController.delete));

export default airPlaneRouter;
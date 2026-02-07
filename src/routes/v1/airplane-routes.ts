import {Router} from "express";
import { AirplaneController } from "../../controllers/airplane-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/airplane-middleware";
import asyncHandler from "../../utils/async-handler";

const airPlaneRouter = Router();

airPlaneRouter.post("/", validateCreateRequest, asyncHandler(AirplaneController.create));
airPlaneRouter.get("/", asyncHandler(AirplaneController.getAll));
airPlaneRouter.get("/:id", asyncHandler(AirplaneController.getById));
airPlaneRouter.put("/:id", validateUpdateRequest, asyncHandler(AirplaneController.update));
airPlaneRouter.delete("/:id", asyncHandler(AirplaneController.delete));

export default airPlaneRouter;
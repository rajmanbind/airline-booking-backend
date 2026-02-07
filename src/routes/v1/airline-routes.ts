import { Router } from "express";
import { AirlineController } from "../../controllers/airline-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/airline-middleware";
import asyncHandler from "../../utils/async-handler";

const airlineRouter = Router();

// CRUD routes
airlineRouter.post("/", validateCreateRequest, asyncHandler(AirlineController.create));
airlineRouter.get("/", asyncHandler(AirlineController.getAll));
airlineRouter.get("/:id", asyncHandler(AirlineController.getById));
airlineRouter.put("/:id", validateUpdateRequest, asyncHandler(AirlineController.update));
airlineRouter.delete("/:id", asyncHandler(AirlineController.delete));

// Additional routes
airlineRouter.get("/code/:code", asyncHandler(AirlineController.getByCode));

export default airlineRouter;

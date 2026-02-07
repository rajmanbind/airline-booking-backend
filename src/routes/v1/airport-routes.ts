import { Router } from "express";
import { AirportController } from "../../controllers/airport-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/airport-middleware";
import asyncHandler from "../../utils/async-handler";

const airportRouter = Router();

// CRUD routes
airportRouter.post("/", validateCreateRequest, asyncHandler(AirportController.create));
airportRouter.get("/", asyncHandler(AirportController.getAll));
airportRouter.get("/:id", asyncHandler(AirportController.getById));
airportRouter.put("/:id", validateUpdateRequest, asyncHandler(AirportController.update));
airportRouter.delete("/:id", asyncHandler(AirportController.delete));

// Additional routes
airportRouter.get("/code/:code", asyncHandler(AirportController.getByCode));
airportRouter.get("/city/:cityId", asyncHandler(AirportController.getByCity));

export default airportRouter;

import { Router } from "express";
import { FlightController } from "../../controllers/flight-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/flight-middleware";
import asyncHandler from "../../utils/async-handler";

const flightRouter = Router();

// CRUD routes
flightRouter.post("/", validateCreateRequest, asyncHandler(FlightController.create));
flightRouter.get("/", asyncHandler(FlightController.getAll));
flightRouter.get("/:id", asyncHandler(FlightController.getById));
flightRouter.put("/:id", validateUpdateRequest, asyncHandler(FlightController.update));
flightRouter.delete("/:id", asyncHandler(FlightController.delete));

// Additional routes
flightRouter.get("/status/:status", asyncHandler(FlightController.getByStatus));
flightRouter.get("/route", asyncHandler(FlightController.getByRoute));

export default flightRouter;

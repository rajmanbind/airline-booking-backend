import { Router } from "express";
import { PassengerController } from "../../controllers/passenger-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/passenger-middleware";
import asyncHandler from "../../utils/async-handler";

const passengerRouter = Router();

// CRUD routes
passengerRouter.post("/", validateCreateRequest, asyncHandler(PassengerController.create));
passengerRouter.get("/", asyncHandler(PassengerController.getAll));
passengerRouter.get("/:id", asyncHandler(PassengerController.getById));
passengerRouter.put("/:id", validateUpdateRequest, asyncHandler(PassengerController.update));
passengerRouter.delete("/:id", asyncHandler(PassengerController.delete));

// Additional routes
passengerRouter.get("/user/:userId", asyncHandler(PassengerController.getByUser));

export default passengerRouter;

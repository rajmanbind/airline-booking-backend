import { Router } from "express";
import { SeatController } from "../../controllers/seat-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/seat-middleware";
import asyncHandler from "../../utils/async-handler";

const seatRouter = Router();

// CRUD routes
seatRouter.post("/", validateCreateRequest, asyncHandler(SeatController.create));
seatRouter.get("/", asyncHandler(SeatController.getAll));
seatRouter.get("/:id", asyncHandler(SeatController.getById));
seatRouter.put("/:id", validateUpdateRequest, asyncHandler(SeatController.update));
seatRouter.delete("/:id", asyncHandler(SeatController.delete));

// Additional routes
seatRouter.get("/airplane/:airplaneId", asyncHandler(SeatController.getByAirplane));

export default seatRouter;

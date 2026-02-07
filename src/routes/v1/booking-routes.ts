import { Router } from "express";
import { BookingController } from "../../controllers/booking-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/booking-middleware";
import asyncHandler from "../../utils/async-handler";

const bookingRouter = Router();

// CRUD routes
bookingRouter.post("/", validateCreateRequest, asyncHandler(BookingController.create));
bookingRouter.get("/", asyncHandler(BookingController.getAll));
bookingRouter.get("/:id", asyncHandler(BookingController.getById));
bookingRouter.put("/:id", validateUpdateRequest, asyncHandler(BookingController.update));
bookingRouter.delete("/:id", asyncHandler(BookingController.delete));

// Additional routes
bookingRouter.get("/reference/:reference", asyncHandler(BookingController.getByReference));
bookingRouter.get("/user/:userId", asyncHandler(BookingController.getByUser));

export default bookingRouter;

import { Router } from "express";
import { TicketController } from "../../controllers/ticket-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/ticket-middleware";
import asyncHandler from "../../utils/async-handler";

const ticketRouter = Router();

// CRUD routes
ticketRouter.post("/", validateCreateRequest, asyncHandler(TicketController.create));
ticketRouter.get("/", asyncHandler(TicketController.getAll));
ticketRouter.get("/:id", asyncHandler(TicketController.getById));
ticketRouter.put("/:id", validateUpdateRequest, asyncHandler(TicketController.update));
ticketRouter.delete("/:id", asyncHandler(TicketController.delete));

// Additional routes
ticketRouter.get("/number/:ticketNumber", asyncHandler(TicketController.getByTicketNumber));
ticketRouter.get("/booking/:bookingId", asyncHandler(TicketController.getByBooking));

export default ticketRouter;

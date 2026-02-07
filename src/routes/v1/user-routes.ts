import { Router } from "express";
import { UserController } from "../../controllers/user-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/user-middleware";
import asyncHandler from "../../utils/async-handler";

const userRouter = Router();

// CRUD routes
userRouter.post("/", validateCreateRequest, asyncHandler(UserController.create));
userRouter.get("/", asyncHandler(UserController.getAll));
userRouter.get("/:id", asyncHandler(UserController.getById));
userRouter.put("/:id", validateUpdateRequest, asyncHandler(UserController.update));
userRouter.delete("/:id", asyncHandler(UserController.delete));

// Additional routes
userRouter.get("/email/:email", asyncHandler(UserController.getByEmail));

export default userRouter;

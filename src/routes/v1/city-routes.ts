import { Router } from "express";
import { CityController } from "../../controllers/city-controller";
import { validateCreateRequest, validateUpdateRequest } from "../../middlewares/city-middleware";
import asyncHandler from "../../utils/async-handler";

const cityRouter = Router();

// CRUD routes
cityRouter.post("/", validateCreateRequest, asyncHandler(CityController.create));
cityRouter.get("/", asyncHandler(CityController.getAll));
cityRouter.get("/:id", asyncHandler(CityController.getById));
cityRouter.put("/:id", validateUpdateRequest, asyncHandler(CityController.update));
cityRouter.delete("/:id", asyncHandler(CityController.delete));

// Additional routes
cityRouter.get("/name/:name", asyncHandler(CityController.getByName));
cityRouter.get("/country/:countryCode", asyncHandler(CityController.getByCountry));

export default cityRouter;

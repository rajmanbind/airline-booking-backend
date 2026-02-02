import express from "express";
import HomeController from "../../controllers/home-controller";
const homeRouter = express.Router();

homeRouter.get("/", HomeController.home);

export default homeRouter;
import express from "express";
import AboutController from "../../controllers/about-controller";
const aboutRouter = express.Router();

aboutRouter.get("/", AboutController.about);

export default aboutRouter;
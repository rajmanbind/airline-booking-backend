import express from "express";
import aboutRouter from "./about-router";
import homeRouter from "./home-router";
import airPlaneRouter from "./airplane-routes";
const v1Router = express.Router();

v1Router.use("/about", aboutRouter)
v1Router.use("/home", homeRouter)
v1Router.use("/airplanes", airPlaneRouter)

export default v1Router;
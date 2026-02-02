import express from "express";
import aboutRouter from "./about-router";
import homeRouter from "./home-router";
const v1Router = express.Router();

v1Router.use("/about", aboutRouter)
v1Router.use("/home", homeRouter)

export default v1Router;
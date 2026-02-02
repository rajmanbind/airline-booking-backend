import express from "express";
import aboutRouter from "../v1/about-router";
import homeRouter from "../v1/home-router";
const v1Router = express.Router();

v1Router.use("/about", aboutRouter)
v1Router.use("/home", homeRouter)

export default v1Router;
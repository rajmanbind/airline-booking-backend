import express from "express";
import aboutRouter from "./about-router";
import homeRouter from "./home-router";
import airPlaneRouter from "./airplane-routes";
import cityRouter from "./city-routes";
import airlineRouter from "./airline-routes";
import airportRouter from "./airport-routes";
import flightRouter from "./flight-routes";
import userRouter from "./user-routes";
import seatRouter from "./seat-routes";
import passengerRouter from "./passenger-routes";
import bookingRouter from "./booking-routes";
import ticketRouter from "./ticket-routes";
const v1Router = express.Router();

v1Router.use("/about", aboutRouter)
v1Router.use("/home", homeRouter)
v1Router.use("/airplanes", airPlaneRouter)
v1Router.use("/airlines", airlineRouter)
v1Router.use("/airports", airportRouter)
v1Router.use("/flights", flightRouter)
v1Router.use("/users", userRouter)
v1Router.use("/seats", seatRouter)
v1Router.use("/passengers", passengerRouter)
v1Router.use("/bookings", bookingRouter)
v1Router.use("/tickets", ticketRouter)
v1Router.use("/cities", cityRouter)

export default v1Router;
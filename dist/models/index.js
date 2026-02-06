"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
// Import model initializers
const Airlplane_1 = require("./Airlplane");
const City_1 = require("./City");
const Airline_1 = require("./Airline");
const Airport_1 = require("./Airport");
const Seat_1 = require("./Seat");
const Flight_1 = require("./Flight");
const FlightSeat_1 = require("./FlightSeat");
const User_1 = require("./User");
const Passenger_1 = require("./Passenger");
const Booking_1 = require("./Booking");
const Ticket_1 = require("./Ticket");
const Payment_1 = require("./Payment");
const Baggage_1 = require("./Baggage");
const BoardingPass_1 = require("./BoardingPass");
const Review_1 = require("./Review");
// Initialize all models
const models = {
    City: (0, City_1.initCityModel)(database_1.default),
    Airline: (0, Airline_1.initAirlineModel)(database_1.default),
    Airplane: (0, Airlplane_1.initAirplaneModel)(database_1.default),
    Airport: (0, Airport_1.initAirportModel)(database_1.default),
    Seat: (0, Seat_1.initSeatModel)(database_1.default),
    Flight: (0, Flight_1.initFlightModel)(database_1.default),
    FlightSeat: (0, FlightSeat_1.initFlightSeatModel)(database_1.default),
    User: (0, User_1.initUserModel)(database_1.default),
    Passenger: (0, Passenger_1.initPassengerModel)(database_1.default),
    Booking: (0, Booking_1.initBookingModel)(database_1.default),
    Ticket: (0, Ticket_1.initTicketModel)(database_1.default),
    Payment: (0, Payment_1.initPaymentModel)(database_1.default),
    Baggage: (0, Baggage_1.initBaggageModel)(database_1.default),
    BoardingPass: (0, BoardingPass_1.initBoardingPassModel)(database_1.default),
    Review: (0, Review_1.initReviewModel)(database_1.default),
};
// Setup all associations
const setupAssociations = () => {
    (0, City_1.associateCity)(models);
    (0, Airline_1.associateAirline)(models);
    (0, Airlplane_1.associateAirplane)(models);
    (0, Airport_1.associateAirport)(models);
    (0, Seat_1.associateSeat)(models);
    (0, Flight_1.associateFlight)(models);
    (0, FlightSeat_1.associateFlightSeat)(models);
    (0, User_1.associateUser)(models);
    (0, Passenger_1.associatePassenger)(models);
    (0, Booking_1.associateBooking)(models);
    (0, Ticket_1.associateTicket)(models);
    (0, Payment_1.associatePayment)(models);
    (0, Baggage_1.associateBaggage)(models);
    (0, BoardingPass_1.associateBoardingPass)(models);
    (0, Review_1.associateReview)(models);
};
// Run associations
setupAssociations();
exports.default = models;

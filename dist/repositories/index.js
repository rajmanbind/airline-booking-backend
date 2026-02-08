"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepository = exports.BookingRepository = exports.PassengerRepository = exports.SeatRepository = exports.UserRepository = exports.FlightRepository = exports.AirportRepository = exports.AirlineRepository = void 0;
__exportStar(require("./airplane-repository"), exports);
__exportStar(require("./city-repository"), exports);
var airline_repository_1 = require("./airline-repository");
Object.defineProperty(exports, "AirlineRepository", { enumerable: true, get: function () { return airline_repository_1.AirlineRepository; } });
var airport_repository_1 = require("./airport-repository");
Object.defineProperty(exports, "AirportRepository", { enumerable: true, get: function () { return airport_repository_1.AirportRepository; } });
var flight_repository_1 = require("./flight-repository");
Object.defineProperty(exports, "FlightRepository", { enumerable: true, get: function () { return flight_repository_1.FlightRepository; } });
var user_repository_1 = require("./user-repository");
Object.defineProperty(exports, "UserRepository", { enumerable: true, get: function () { return user_repository_1.UserRepository; } });
var seat_repository_1 = require("./seat-repository");
Object.defineProperty(exports, "SeatRepository", { enumerable: true, get: function () { return seat_repository_1.SeatRepository; } });
var passenger_repository_1 = require("./passenger-repository");
Object.defineProperty(exports, "PassengerRepository", { enumerable: true, get: function () { return passenger_repository_1.PassengerRepository; } });
var booking_repository_1 = require("./booking-repository");
Object.defineProperty(exports, "BookingRepository", { enumerable: true, get: function () { return booking_repository_1.BookingRepository; } });
var ticket_repository_1 = require("./ticket-repository");
Object.defineProperty(exports, "TicketRepository", { enumerable: true, get: function () { return ticket_repository_1.TicketRepository; } });

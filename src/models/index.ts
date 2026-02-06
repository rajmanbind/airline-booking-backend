import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

// Import model initializers
import { initAirplaneModel, associateAirplane } from './Airlplane';
import { initCityModel, associateCity } from './City';
import { initAirlineModel, associateAirline } from './Airline';
import { initAirportModel, associateAirport } from './Airport';
import { initSeatModel, associateSeat } from './Seat';
import { initFlightModel, associateFlight } from './Flight';
import { initFlightSeatModel, associateFlightSeat } from './FlightSeat';
import { initUserModel, associateUser } from './User';
import { initPassengerModel, associatePassenger } from './Passenger';
import { initBookingModel, associateBooking } from './Booking';
import { initTicketModel, associateTicket } from './Ticket';
import { initPaymentModel, associatePayment } from './Payment';
import { initBaggageModel, associateBaggage } from './Baggage';
import { initBoardingPassModel, associateBoardingPass } from './BoardingPass';
import { initReviewModel, associateReview } from './Review';

// Initialize all models
const models = {
  City: initCityModel(sequelize),
  Airline: initAirlineModel(sequelize),
  Airplane: initAirplaneModel(sequelize),
  Airport: initAirportModel(sequelize),
  Seat: initSeatModel(sequelize),
  Flight: initFlightModel(sequelize),
  FlightSeat: initFlightSeatModel(sequelize),
  User: initUserModel(sequelize),
  Passenger: initPassengerModel(sequelize),
  Booking: initBookingModel(sequelize),
  Ticket: initTicketModel(sequelize),
  Payment: initPaymentModel(sequelize),
  Baggage: initBaggageModel(sequelize),
  BoardingPass: initBoardingPassModel(sequelize),
  Review: initReviewModel(sequelize),
};

// Setup all associations
const setupAssociations = () => {
  associateCity(models);
  associateAirline(models);
  associateAirplane(models);
  associateAirport(models);
  associateSeat(models);
  associateFlight(models);
  associateFlightSeat(models);
  associateUser(models);
  associatePassenger(models);
  associateBooking(models);
  associateTicket(models);
  associatePayment(models);
  associateBaggage(models);
  associateBoardingPass(models);
  associateReview(models);
};

// Run associations
setupAssociations();

// Export everything
export { sequelize, Sequelize };
export default models;
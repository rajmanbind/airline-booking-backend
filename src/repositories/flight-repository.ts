import models from '../models';
import { CreateFlightDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type Flight = typeof models.Flight extends { prototype: infer T } ? T : never;

export function FlightRepository() {
  const baseRepo = CrudRepository<Flight, CreateFlightDTO>(models.Flight);

  const getByFlightNumber = async (flightNumber: string): Promise<Flight[]> => {
    try {
      return await models.Flight.findAll({ where: { flightNumber }, order: [['departureTime', 'DESC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByAirline = async (airlineId: number): Promise<Flight[]> => {
    try {
      return await models.Flight.findAll({ where: { airlineId }, order: [['departureTime', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByRoute = async (departureAirportId: number, arrivalAirportId: number): Promise<Flight[]> => {
    try {
      return await models.Flight.findAll({ where: { departureAirportId, arrivalAirportId }, order: [['departureTime', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByStatus = async (status: string): Promise<Flight[]> => {
    try {
      return await models.Flight.findAll({ where: { status }, order: [['departureTime', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByDateRange = async (startDate: Date, endDate: Date): Promise<Flight[]> => {
    try {
      return await models.Flight.findAll({ where: { departureTime: { [Op.between]: [startDate, endDate] } }, order: [['departureTime', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByPriceRange = async (minPrice: number, maxPrice: number): Promise<Flight[]> => {
    try {
      return await models.Flight.findAll({ where: { price: { [Op.between]: [minPrice, maxPrice] } }, order: [['price', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByFlightNumber,
    getByAirline,
    getByRoute,
    getByStatus,
    getByDateRange,
    getByPriceRange,
  };
}

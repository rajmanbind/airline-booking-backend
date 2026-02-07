import models from '../models';
import { CreateFlightDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type Flight = typeof models.Flight extends { prototype: infer T } ? T : never;

class FlightRepository {
  private crudRepo: ReturnType<typeof CrudRepository<Flight, CreateFlightDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<Flight, CreateFlightDTO>(models.Flight);
  }

  async create(data: CreateFlightDTO): Promise<Flight> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<Flight[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<Flight | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreateFlightDTO>): Promise<Flight | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByFlightNumber(flightNumber: string): Promise<Flight[]> {
    return await models.Flight.findAll({
      where: { flightNumber },
      order: [['departureTime', 'DESC']]
    });
  }

  async getByAirline(airlineId: number): Promise<Flight[]> {
    return await models.Flight.findAll({
      where: { airlineId },
      order: [['departureTime', 'ASC']]
    });
  }

  async getByRoute(departureAirportId: number, arrivalAirportId: number): Promise<Flight[]> {
    return await models.Flight.findAll({
      where: {
        departureAirportId,
        arrivalAirportId
      },
      order: [['departureTime', 'ASC']]
    });
  }

  async getByStatus(status: string): Promise<Flight[]> {
    return await models.Flight.findAll({
      where: { status },
      order: [['departureTime', 'ASC']]
    });
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<Flight[]> {
    return await models.Flight.findAll({
      where: {
        departureTime: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['departureTime', 'ASC']]
    });
  }

  async getByPriceRange(minPrice: number, maxPrice: number): Promise<Flight[]> {
    return await models.Flight.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice]
        }
      },
      order: [['price', 'ASC']]
    });
  }
}

export default new FlightRepository();

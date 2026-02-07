import models from '../models';
import { CreateAirlineDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type Airline = typeof models.Airline extends { prototype: infer T } ? T : never;

class AirlineRepository {
  private crudRepo: ReturnType<typeof CrudRepository<Airline, CreateAirlineDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<Airline, CreateAirlineDTO>(models.Airline);
  }

  async create(data: CreateAirlineDTO): Promise<Airline> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<Airline[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<Airline | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreateAirlineDTO>): Promise<Airline | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByCode(code: string): Promise<Airline | null> {
    return await models.Airline.findOne({
      where: { code: code.toUpperCase() }
    });
  }

  async getByCountry(country: string): Promise<Airline[]> {
    return await models.Airline.findAll({
      where: { country },
      order: [['name', 'ASC']]
    });
  }

  async searchByName(name: string): Promise<Airline[]> {
    return await models.Airline.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      },
      order: [['name', 'ASC']]
    });
  }
}

export default new AirlineRepository();

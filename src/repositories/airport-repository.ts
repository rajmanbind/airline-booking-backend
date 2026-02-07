import models from '../models';
import { CreateAirportDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type Airport = typeof models.Airport extends { prototype: infer T } ? T : never;

class AirportRepository {
  private crudRepo: ReturnType<typeof CrudRepository<Airport, CreateAirportDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<Airport, CreateAirportDTO>(models.Airport);
  }

  async create(data: CreateAirportDTO): Promise<Airport> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<Airport[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<Airport | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreateAirportDTO>): Promise<Airport | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByCode(code: string): Promise<Airport | null> {
    return await models.Airport.findOne({
      where: { code: code.toUpperCase() }
    });
  }

  async getByCityId(cityId: number): Promise<Airport[]> {
    return await models.Airport.findAll({
      where: { cityId },
      order: [['name', 'ASC']]
    });
  }

  async getByTimezone(timezone: string): Promise<Airport[]> {
    return await models.Airport.findAll({
      where: { timezone },
      order: [['name', 'ASC']]
    });
  }

  async searchByName(name: string): Promise<Airport[]> {
    return await models.Airport.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`
        }
      },
      order: [['name', 'ASC']]
    });
  }
}

export default new AirportRepository();

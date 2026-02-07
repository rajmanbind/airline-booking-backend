import models from '../models';
import { CreatePassengerDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type Passenger = typeof models.Passenger extends { prototype: infer T } ? T : never;

class PassengerRepository {
  private crudRepo: ReturnType<typeof CrudRepository<Passenger, CreatePassengerDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<Passenger, CreatePassengerDTO>(models.Passenger);
  }

  async create(data: CreatePassengerDTO): Promise<Passenger> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<Passenger[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<Passenger | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreatePassengerDTO>): Promise<Passenger | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByUserId(userId: number): Promise<Passenger[]> {
    return await models.Passenger.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
  }

  async getByPassportNumber(passportNumber: string): Promise<Passenger | null> {
    return await models.Passenger.findOne({
      where: { passportNumber }
    });
  }

  async getByNationality(nationality: string): Promise<Passenger[]> {
    return await models.Passenger.findAll({
      where: { nationality },
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });
  }

  async searchByName(name: string): Promise<Passenger[]> {
    return await models.Passenger.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.like]: `%${name}%` } },
          { lastName: { [Op.like]: `%${name}%` } }
        ]
      },
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });
  }
}

export default new PassengerRepository();

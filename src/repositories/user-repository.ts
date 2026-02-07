import models from '../models';
import { CreateUserDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type User = typeof models.User extends { prototype: infer T } ? T : never;

class UserRepository {
  private crudRepo: ReturnType<typeof CrudRepository<User, CreateUserDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<User, CreateUserDTO>(models.User);
  }

  async create(data: CreateUserDTO): Promise<User> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<User[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<User | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreateUserDTO>): Promise<User | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await models.User.findOne({
      where: { email: email.toLowerCase() }
    });
  }

  async getByRole(role: string): Promise<User[]> {
    return await models.User.findAll({
      where: { role },
      order: [['createdAt', 'DESC']]
    });
  }

  async getByNationality(nationality: string): Promise<User[]> {
    return await models.User.findAll({
      where: { nationality },
      order: [['lastName', 'ASC'], ['firstName', 'ASC']]
    });
  }

  async searchByName(name: string): Promise<User[]> {
    return await models.User.findAll({
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

export default new UserRepository();

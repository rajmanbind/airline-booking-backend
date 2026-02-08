import models from '../models';
import { CreateUserDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';
import { Logger } from '../config';

type User = typeof models.User extends { prototype: infer T } ? T : never;

export function UserRepository() {
  const baseRepo = CrudRepository<User, CreateUserDTO>(models.User);

  const getByEmail = async (email: string): Promise<User | null> => {
    try {
      return await models.User.findOne({ where: { email: email.toLowerCase() } });
    } catch (error) {
      Logger.error('Something went wrong in UserRepo: getByEmail', error);
      throw error;
    }
  };

  const getByRole = async (role: string): Promise<User[]> => {
    try {
      return await models.User.findAll({ where: { role }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      Logger.error('Something went wrong in UserRepo: getByRole', error);
      throw error;
    }
  };

  const getByNationality = async (nationality: string): Promise<User[]> => {
    try {
      return await models.User.findAll({ where: { nationality }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
    } catch (error) {
      Logger.error('Something went wrong in UserRepo: getByNationality', error);
      throw error;
    }
  };

  const searchByName = async (name: string): Promise<User[]> => {
    try {
      return await baseRepo.findAll({ where: { [Op.or]: [ { firstName: { [Op.like]: `%${name}%` } }, { lastName: { [Op.like]: `%${name}%` } } ] }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
    } catch (error) {
      Logger.error('Something went wrong in UserRepo: searchByName', error);
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByEmail,
    getByRole,
    getByNationality,
    searchByName,
  };
}

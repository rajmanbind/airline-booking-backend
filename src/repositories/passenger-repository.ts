import models from '../models';
import { CreatePassengerDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type Passenger = typeof models.Passenger extends { prototype: infer T } ? T : never;

export function PassengerRepository() {
  const baseRepo = CrudRepository<Passenger, CreatePassengerDTO>(models.Passenger);

  const getByUserId = async (userId: number): Promise<Passenger[]> => {
    try {
      return await models.Passenger.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByPassportNumber = async (passportNumber: string): Promise<Passenger | null> => {
    try {
      return await models.Passenger.findOne({ where: { passportNumber } });
    } catch (error) {
      throw error;
    }
  };

  const getByNationality = async (nationality: string): Promise<Passenger[]> => {
    try {
      return await models.Passenger.findAll({ where: { nationality }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const searchByName = async (name: string): Promise<Passenger[]> => {
    try {
      return await baseRepo.findAll({ where: { [Op.or]: [ { firstName: { [Op.like]: `%${name}%` } }, { lastName: { [Op.like]: `%${name}%` } } ] }, order: [['lastName', 'ASC'], ['firstName', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByUserId,
    getByPassportNumber,
    getByNationality,
    searchByName,
  };
}

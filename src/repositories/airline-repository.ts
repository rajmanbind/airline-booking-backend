import models from '../models';
import { CreateAirlineDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';
import { Logger } from '../config';

type Airline = typeof models.Airline extends { prototype: infer T } ? T : never;

export function AirlineRepository() {
  const baseRepo = CrudRepository<Airline, CreateAirlineDTO>(models.Airline);

  const getByCode = async (code: string): Promise<Airline | null> => {
    try {
      return await models.Airline.findOne({ where: { code: code.toUpperCase() } });
    } catch (error) {
      Logger.error('Something went wrong in AirlineRepo: getByCode', error);
      throw error;
    }
  };

  const getByCountry = async (country: string): Promise<Airline[]> => {
    try {
      return await models.Airline.findAll({ where: { country }, order: [['name', 'ASC']] });
    } catch (error) {
      Logger.error('Something went wrong in AirlineRepo: getByCountry', error);
      throw error;
    }
  };

  const searchByName = async (name: string): Promise<Airline[]> => {
    try {
      return await baseRepo.findAll({ where: { name: { [Op.like]: `%${name}%` } }, order: [['name', 'ASC']] });
    } catch (error) {
      Logger.error('Something went wrong in AirlineRepo: searchByName', error);
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByCode,
    getByCountry,
    searchByName,
  };
}

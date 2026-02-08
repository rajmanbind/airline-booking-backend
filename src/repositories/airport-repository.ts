import models from '../models';
import { Logger } from '../config';
import { CreateAirportDTO } from '../types';
import { CrudRepository } from './crud-repositories';
import { Op } from 'sequelize';

type Airport = typeof models.Airport extends { prototype: infer T } ? T : never;

export function AirportRepository() {
  const baseRepo = CrudRepository<Airport, CreateAirportDTO>(models.Airport);

  const getByCode = async (code: string): Promise<Airport | null> => {
    try {
      return await models.Airport.findOne({ where: { code: code.toUpperCase() } });
    } catch (error) {
      Logger.error('Something went wrong in AirportRepo: getByCode', error);
      throw error;
    }
  };

  const getByCityId = async (cityId: number): Promise<Airport[]> => {
    try {
      return await models.Airport.findAll({ where: { cityId }, order: [['name', 'ASC']] });
    } catch (error) {
      Logger.error('Something went wrong in AirportRepo: getByCityId', error);
      throw error;
    }
  };

  const getByTimezone = async (timezone: string): Promise<Airport[]> => {
    try {
      return await models.Airport.findAll({ where: { timezone }, order: [['name', 'ASC']] });
    } catch (error) {
      Logger.error('Something went wrong in AirportRepo: getByTimezone', error);
      throw error;
    }
  };

  const searchByName = async (name: string): Promise<Airport[]> => {
    try {
      return await baseRepo.findAll({
        where: { name: { [Op.like]: `%${name}%` } },
        order: [['name', 'ASC']],
      });
    } catch (error) {
      Logger.error('Something went wrong in AirportRepo: searchByName', error);
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByCode,
    getByCityId,
    getByTimezone,
    searchByName,
  };
}

import { Logger } from "../config";
import City from "../models/City";
import { CrudRepository } from "./crud-repositories";
import { Op } from 'sequelize';
import { CreateCityDTO, CityResponse } from "../types";

export function CityRepository() {
  const baseRepo = CrudRepository<City, CreateCityDTO>(City);

  // Add domain-specific methods here
  const getByName = async (name: string): Promise<CityResponse | null> => {
    try {
      return await City.findOne({ where: { name } });
    } catch (error) {
      Logger.error("Something went wrong in CityRepo: getByName");
      throw error;
    }
  };

  const getByCountry = async (countryCode: string): Promise<CityResponse[]> => {
    try {
      return await City.findAll({
        where: { countryCode },
        order: [['name', 'ASC']],
      });
    } catch (error) {
      Logger.error("Something went wrong in CityRepo: getByCountry");
      throw error;
    }
  };

  const getLargePopulationCities = async (minPopulation: number): Promise<CityResponse[]> => {
    try {
      return await City.findAll({
        where: {
          population: { [Op.gte]: minPopulation },
        },
        order: [['population', 'DESC']],
      });
    } catch (error) {
      Logger.error("Something went wrong in CityRepo: getLargePopulationCities");
      throw error;
    }
  };

  const getAll = async (opts: { where?: any; limit?: number; offset?: number; order?: any } = {}): Promise<{ rows: CityResponse[]; count: number }> => {
    try {
      const { where = {}, limit, offset, order = [['id', 'ASC']] } = opts;
      const result = await City.findAndCountAll({ where, limit, offset, order });
      return {
        rows: result.rows,
        count: result.count,
      };
    } catch (error) {
      Logger.error('Something went wrong in CityRepo: getAll', error);
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByName,
    getByCountry,
    getLargePopulationCities,
    getAll,
  };
}

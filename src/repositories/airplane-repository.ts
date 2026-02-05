import { Logger } from "../config";
import Airplane from "../models/Airlplane";
import { CrudRepository } from "./crud-repositories";
import { Op } from 'sequelize';

export function AirplaneRepository() {
 const baseRepo = CrudRepository(Airplane);

  // Add domain-specific methods here
  const getByModelNumber = async (modelNumber: string) => {
    try {
      return await Airplane.findOne({ where: { modelNumber } });
    } catch (error) {
      Logger.error("Something went wrong in AirplaneRepo: getByModelNumber");
      throw error;
    }
  };

  const getLargeCapacityPlanes = async (minCapacity: number) => {
    try {
      return await Airplane.findAll({
        where: {
          capacity: { [Op.gte]: minCapacity },
        },
      });
    } catch (error) {
      Logger.error("Something went wrong in AirplaneRepo: getLargeCapacityPlanes");
      throw error;
    }
  };

  const getAll = async (opts: { where?: any; limit?: number; offset?: number; order?: any } = {}) => {
    try {
      const { where = {}, limit, offset, order = [['id', 'ASC']] } = opts;
      const result = await Airplane.findAndCountAll({ where, limit, offset, order });
      return {
        rows: result.rows,
        count: result.count,
      };
    } catch (error) {
      Logger.error('Something went wrong in AirplaneRepo: getAll', error);
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByModelNumber,
    getLargeCapacityPlanes,
    getAll,
  };
}
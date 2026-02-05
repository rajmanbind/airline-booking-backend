import { Logger } from "../config";
import Airplane from "../models/Airlplane";
import { CrudRepository } from "./crud-reposotories";

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
          capacity: { $gte: minCapacity },
        },
      });
    } catch (error) {
      Logger.error("Something went wrong in AirplaneRepo: getLargeCapacityPlanes");
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByModelNumber,
    getLargeCapacityPlanes,
  };
}
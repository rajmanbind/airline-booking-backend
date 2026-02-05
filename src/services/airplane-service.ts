import { AirplaneRepository } from "../repositories/airplane-repository";
import { Logger } from "../config";

const airplaneRepo = AirplaneRepository();

export const AirplaneService = {
  async createAirplane(data: any) {
    try {
      return await airplaneRepo.create(data);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: createAirplane");
      throw error;
    }
  },

  async getAirplaneById(id: number) {
    try {
      return await airplaneRepo.getById(id);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: getAirplaneById");
      throw error;
    }
  },

  async getAllAirplanes(filters: any = {}) {
    try {
      return await airplaneRepo.getAll(filters);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: getAllAirplanes");
      throw error;
    }
  },

  async updateAirplane(id: number, data: any) {
    try {
      return await airplaneRepo.update(id, data);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: updateAirplane");
      throw error;
    }
  },

  async deleteAirplane(id: number) {
    try {
      return await airplaneRepo.deleteById(id);
    } catch (error) {
      Logger.error("Something went wrong in AirplaneService: deleteAirplane");
      throw error;
    }
  },
};
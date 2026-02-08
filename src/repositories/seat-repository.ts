import models from '../models';
import { CreateSeatDTO } from '../types';
import { CrudRepository } from './crud-repositories';

type Seat = typeof models.Seat extends { prototype: infer T } ? T : never;

export function SeatRepository() {
  const baseRepo = CrudRepository<Seat, CreateSeatDTO>(models.Seat);

  const getByAirplane = async (airplaneId: number): Promise<Seat[]> => {
    try {
      return await models.Seat.findAll({ where: { airplaneId }, order: [['seatNumber', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByClass = async (airplaneId: number, seatClass: string): Promise<Seat[]> => {
    try {
      return await models.Seat.findAll({ where: { airplaneId, class: seatClass }, order: [['seatNumber', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getWindowSeats = async (airplaneId: number): Promise<Seat[]> => {
    try {
      return await models.Seat.findAll({ where: { airplaneId, isWindowSeat: true }, order: [['seatNumber', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getAisleSeats = async (airplaneId: number): Promise<Seat[]> => {
    try {
      return await models.Seat.findAll({ where: { airplaneId, isAisleSeat: true }, order: [['seatNumber', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getBySeatNumber = async (airplaneId: number, seatNumber: string): Promise<Seat | null> => {
    try {
      return await models.Seat.findOne({ where: { airplaneId, seatNumber } });
    } catch (error) {
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByAirplane,
    getByClass,
    getWindowSeats,
    getAisleSeats,
    getBySeatNumber,
  };
}

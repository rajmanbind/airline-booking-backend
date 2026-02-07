import models from '../models';
import { CreateSeatDTO } from '../types';
import { CrudRepository } from './crud-repositories';

type Seat = typeof models.Seat extends { prototype: infer T } ? T : never;

class SeatRepository {
  private crudRepo: ReturnType<typeof CrudRepository<Seat, CreateSeatDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<Seat, CreateSeatDTO>(models.Seat);
  }

  async create(data: CreateSeatDTO): Promise<Seat> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<Seat[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<Seat | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreateSeatDTO>): Promise<Seat | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByAirplane(airplaneId: number): Promise<Seat[]> {
    return await models.Seat.findAll({
      where: { airplaneId },
      order: [['seatNumber', 'ASC']]
    });
  }

  async getByClass(airplaneId: number, seatClass: string): Promise<Seat[]> {
    return await models.Seat.findAll({
      where: {
        airplaneId,
        class: seatClass
      },
      order: [['seatNumber', 'ASC']]
    });
  }

  async getWindowSeats(airplaneId: number): Promise<Seat[]> {
    return await models.Seat.findAll({
      where: {
        airplaneId,
        isWindowSeat: true
      },
      order: [['seatNumber', 'ASC']]
    });
  }

  async getAisleSeats(airplaneId: number): Promise<Seat[]> {
    return await models.Seat.findAll({
      where: {
        airplaneId,
        isAisleSeat: true
      },
      order: [['seatNumber', 'ASC']]
    });
  }

  async getBySeatNumber(airplaneId: number, seatNumber: string): Promise<Seat | null> {
    return await models.Seat.findOne({
      where: {
        airplaneId,
        seatNumber
      }
    });
  }
}

export default new SeatRepository();

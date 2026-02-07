import models from '../models';
import { CreateBookingDTO } from '../types';
import { CrudRepository } from './crud-repositories';

type Booking = typeof models.Booking extends { prototype: infer T } ? T : never;

class BookingRepository {
  private crudRepo: ReturnType<typeof CrudRepository<Booking, CreateBookingDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<Booking, CreateBookingDTO>(models.Booking);
  }

  async create(data: CreateBookingDTO): Promise<Booking> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<Booking[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<Booking | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreateBookingDTO>): Promise<Booking | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByUserId(userId: number): Promise<Booking[]> {
    return await models.Booking.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
  }

  async getByReference(bookingReference: string): Promise<Booking | null> {
    return await models.Booking.findOne({
      where: { bookingReference }
    });
  }

  async getByStatus(status: string): Promise<Booking[]> {
    return await models.Booking.findAll({
      where: { status },
      order: [['createdAt', 'DESC']]
    });
  }

  async getByPaymentStatus(paymentStatus: string): Promise<Booking[]> {
    return await models.Booking.findAll({
      where: { paymentStatus },
      order: [['createdAt', 'DESC']]
    });
  }
}

export default new BookingRepository();

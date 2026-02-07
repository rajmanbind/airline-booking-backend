import models from '../models';
import { CreateTicketDTO } from '../types';
import { CrudRepository } from './crud-repositories';

type Ticket = typeof models.Ticket extends { prototype: infer T } ? T : never;

class TicketRepository {
  private crudRepo: ReturnType<typeof CrudRepository<Ticket, CreateTicketDTO>>;

  constructor() {
    this.crudRepo = CrudRepository<Ticket, CreateTicketDTO>(models.Ticket);
  }

  async create(data: CreateTicketDTO): Promise<Ticket> {
    return await this.crudRepo.create(data);
  }

  async getAll(filter: any = {}): Promise<Ticket[]> {
    return await this.crudRepo.findAll(filter);
  }

  async getById(id: number): Promise<Ticket | null> {
    return await this.crudRepo.getById(id);
  }

  async update(id: number, data: Partial<CreateTicketDTO>): Promise<Ticket | null> {
    return await this.crudRepo.update(id, data);
  }

  async destroy(id: number): Promise<number> {
    return await this.crudRepo.destroy(id);
  }

  async getByBookingId(bookingId: number): Promise<Ticket[]> {
    return await models.Ticket.findAll({
      where: { bookingId },
      order: [['createdAt', 'ASC']]
    });
  }

  async getByFlightId(flightId: number): Promise<Ticket[]> {
    return await models.Ticket.findAll({
      where: { flightId },
      order: [['createdAt', 'ASC']]
    });
  }

  async getByPassengerId(passengerId: number): Promise<Ticket[]> {
    return await models.Ticket.findAll({
      where: { passengerId },
      order: [['createdAt', 'DESC']]
    });
  }

  async getByTicketNumber(ticketNumber: string): Promise<Ticket | null> {
    return await models.Ticket.findOne({
      where: { ticketNumber }
    });
  }

  async getByStatus(status: string): Promise<Ticket[]> {
    return await models.Ticket.findAll({
      where: { status },
      order: [['createdAt', 'DESC']]
    });
  }

  async getByClass(ticketClass: string): Promise<Ticket[]> {
    return await models.Ticket.findAll({
      where: { class: ticketClass },
      order: [['createdAt', 'DESC']]
    });
  }
}

export default new TicketRepository();

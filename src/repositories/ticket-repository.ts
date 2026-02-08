import models from '../models';
import { CreateTicketDTO } from '../types';
import { CrudRepository } from './crud-repositories';

type Ticket = typeof models.Ticket extends { prototype: infer T } ? T : never;

export function TicketRepository() {
  const baseRepo = CrudRepository<Ticket, CreateTicketDTO>(models.Ticket);

  const getByBookingId = async (bookingId: number): Promise<Ticket[]> => {
    try {
      return await models.Ticket.findAll({ where: { bookingId }, order: [['createdAt', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByFlightId = async (flightId: number): Promise<Ticket[]> => {
    try {
      return await models.Ticket.findAll({ where: { flightId }, order: [['createdAt', 'ASC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByPassengerId = async (passengerId: number): Promise<Ticket[]> => {
    try {
      return await models.Ticket.findAll({ where: { passengerId }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByTicketNumber = async (ticketNumber: string): Promise<Ticket | null> => {
    try {
      return await models.Ticket.findOne({ where: { ticketNumber } });
    } catch (error) {
      throw error;
    }
  };

  const getByStatus = async (status: string): Promise<Ticket[]> => {
    try {
      return await models.Ticket.findAll({ where: { status }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByClass = async (ticketClass: string): Promise<Ticket[]> => {
    try {
      return await models.Ticket.findAll({ where: { class: ticketClass }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByBookingId,
    getByFlightId,
    getByPassengerId,
    getByTicketNumber,
    getByStatus,
    getByClass,
  };
}

import models from '../models';
import { CreateBookingDTO } from '../types';
import { CrudRepository } from './crud-repositories';

type Booking = typeof models.Booking extends { prototype: infer T } ? T : never;

export function BookingRepository() {
  const baseRepo = CrudRepository<Booking, CreateBookingDTO>(models.Booking);

  const getByUserId = async (userId: number): Promise<Booking[]> => {
    try {
      return await models.Booking.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      // Logger imported by callers; keep consistent style by rethrowing
      throw error;
    }
  };

  const getByReference = async (bookingReference: string): Promise<Booking | null> => {
    try {
      return await models.Booking.findOne({ where: { bookingReference } });
    } catch (error) {
      throw error;
    }
  };

  const getByStatus = async (status: string): Promise<Booking[]> => {
    try {
      return await models.Booking.findAll({ where: { status }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      throw error;
    }
  };

  const getByPaymentStatus = async (paymentStatus: string): Promise<Booking[]> => {
    try {
      return await models.Booking.findAll({ where: { paymentStatus }, order: [['createdAt', 'DESC']] });
    } catch (error) {
      throw error;
    }
  };

  return {
    ...baseRepo,
    getByUserId,
    getByReference,
    getByStatus,
    getByPaymentStatus,
  };
}

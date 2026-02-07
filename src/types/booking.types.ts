// Booking DTOs and Types

export interface CreateBookingDTO {
  userId: number;
  bookingReference: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
}

export interface UpdateBookingDTO {
  userId?: number;
  bookingReference?: string;
  totalAmount?: number;
  status?: string;
  paymentStatus?: string;
}

export interface BookingResponse {
  id: number;
  userId: number;
  bookingReference: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookingQueryParams {
  userId?: number;
  bookingReference?: string;
  status?: string;
  paymentStatus?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedBookingsResponse {
  data: BookingResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

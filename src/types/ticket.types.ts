// Ticket DTOs and Types

export interface CreateTicketDTO {
  bookingId: number;
  flightId: number;
  passengerId: number;
  seatId?: number;
  ticketNumber: string;
  class: string;
  price: number;
  status: string;
}

export interface UpdateTicketDTO {
  bookingId?: number;
  flightId?: number;
  passengerId?: number;
  seatId?: number;
  ticketNumber?: string;
  class?: string;
  price?: number;
  status?: string;
}

export interface TicketResponse {
  id: number;
  bookingId: number;
  flightId: number;
  passengerId: number;
  seatId?: number;
  ticketNumber: string;
  class: string;
  price: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketQueryParams {
  bookingId?: number;
  flightId?: number;
  passengerId?: number;
  ticketNumber?: string;
  status?: string;
  class?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedTicketsResponse {
  data: TicketResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

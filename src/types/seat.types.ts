// Seat DTOs and Types

export interface CreateSeatDTO {
  airplaneId: number;
  seatNumber: string;
  class: string;
  isWindowSeat: boolean;
  isAisleSeat: boolean;
}

export interface UpdateSeatDTO {
  airplaneId?: number;
  seatNumber?: string;
  class?: string;
  isWindowSeat?: boolean;
  isAisleSeat?: boolean;
}

export interface SeatResponse {
  id: number;
  airplaneId: number;
  seatNumber: string;
  class: string;
  isWindowSeat: boolean;
  isAisleSeat: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SeatQueryParams {
  airplaneId?: number;
  class?: string;
  isWindowSeat?: boolean;
  isAisleSeat?: boolean;
  seatNumber?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedSeatsResponse {
  data: SeatResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Flight DTOs and Types

export interface CreateFlightDTO {
  flightNumber: string;
  airlineId: number;
  airplaneId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  status: string;
  price: number;
  boardingGate?: string;
}

export interface UpdateFlightDTO {
  flightNumber?: string;
  airlineId?: number;
  airplaneId?: number;
  departureAirportId?: number;
  arrivalAirportId?: number;
  departureTime?: Date;
  arrivalTime?: Date;
  duration?: number;
  status?: string;
  price?: number;
  boardingGate?: string;
}

export interface FlightResponse {
  id: number;
  flightNumber: string;
  airlineId: number;
  airplaneId: number;
  departureAirportId: number;
  arrivalAirportId: number;
  departureTime: Date;
  arrivalTime: Date;
  duration: number;
  status: string;
  price: number;
  boardingGate?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FlightQueryParams {
  flightNumber?: string;
  airlineId?: number;
  departureAirportId?: number;
  arrivalAirportId?: number;
  status?: string;
  departureDate?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedFlightsResponse {
  data: FlightResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

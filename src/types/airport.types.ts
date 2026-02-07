// Airport DTOs and Types

export interface CreateAirportDTO {
  code: string;
  name: string;
  cityId: number;
  timezone: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateAirportDTO {
  code?: string;
  name?: string;
  cityId?: number;
  timezone?: string;
  latitude?: number;
  longitude?: number;
}

export interface AirportResponse {
  id: number;
  code: string;
  name: string;
  cityId: number;
  timezone: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AirportQueryParams {
  code?: string;
  cityId?: number;
  timezone?: string;
  name?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedAirportsResponse {
  data: AirportResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

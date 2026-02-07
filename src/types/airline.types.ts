// Airline DTOs and Types

export interface CreateAirlineDTO {
  code: string;
  name: string;
  country: string;
  logo?: string;
  website?: string;
}

export interface UpdateAirlineDTO {
  code?: string;
  name?: string;
  country?: string;
  logo?: string;
  website?: string;
}

export interface AirlineResponse {
  id: number;
  code: string;
  name: string;
  country: string;
  logo?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AirlineQueryParams {
  code?: string;
  country?: string;
  name?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedAirlinesResponse {
  data: AirlineResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/**
 * Data Transfer Object for creating a new city
 */
export interface CreateCityDTO {
  name: string;
  stateCode?: string;
  countryCode: string;
  population?: number;
  timezone: string;
}

/**
 * Data Transfer Object for updating a city
 * All fields are optional since partial updates are allowed
 */
export interface UpdateCityDTO {
  name?: string;
  stateCode?: string;
  countryCode?: string;
  population?: number;
  timezone?: string;
}

/**
 * City entity response
 */
export interface CityResponse {
  id: number;
  name: string;
  stateCode: string;
  countryCode: string;
  population?: number;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Pagination and filtering options for city queries
 */
export interface CityQueryParams {
  page?: number;
  limit?: number;
  name?: string;
  countryCode?: string;
  stateCode?: string;
  minPopulation?: number;
  sort?: string;
  sortBy?: string;
  order?: 'asc' | 'desc' | 'ASC' | 'DESC';
  direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
}

/**
 * Paginated response for city list
 */
export interface PaginatedCitiesResponse {
  data: CityResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

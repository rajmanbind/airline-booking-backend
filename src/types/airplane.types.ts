/**
 * Data Transfer Object for creating a new airplane
 */
export interface CreateAirplaneDTO {
  modelNumber: string;
  capacity: number;
}

/**
 * Data Transfer Object for updating an airplane
 * All fields are optional since partial updates are allowed
 */
export interface UpdateAirplaneDTO {
  modelNumber?: string;
  capacity?: number;
}

/**
 * Airplane entity response
 */
export interface AirplaneResponse {
  id: number;
  modelNumber: string;
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Pagination and filtering options for airplane queries
 */
export interface AirplaneQueryParams {
  page?: number;
  limit?: number;
  minCapacity?: number;
  modelNumber?: string;
  sort?: string;
  sortBy?: string;
  order?: 'asc' | 'desc' | 'ASC' | 'DESC';
  direction?: 'asc' | 'desc' | 'ASC' | 'DESC';
}

/**
 * Paginated response for airplane list
 */
export interface PaginatedAirplanesResponse {
  data: AirplaneResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

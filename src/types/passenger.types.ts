// Passenger DTOs and Types

export interface CreatePassengerDTO {
  userId?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  passportNumber: string;
  nationality: string;
  frequentFlyerNumber?: string;
}

export interface UpdatePassengerDTO {
  userId?: number;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: string;
  passportNumber?: string;
  nationality?: string;
  frequentFlyerNumber?: string;
}

export interface PassengerResponse {
  id: number;
  userId?: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  passportNumber: string;
  nationality: string;
  frequentFlyerNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PassengerQueryParams {
  userId?: number;
  nationality?: string;
  passportNumber?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedPassengersResponse {
  data: PassengerResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// User DTOs and Types

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  passportNumber?: string;
  nationality?: string;
  role: string;
}

export interface UpdateUserDTO {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: Date;
  passportNumber?: string;
  nationality?: string;
  role?: string;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  passportNumber?: string;
  nationality?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserQueryParams {
  email?: string;
  role?: string;
  nationality?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedUsersResponse {
  data: UserResponse[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

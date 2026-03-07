import { Entity } from './index';

/**
 * User model
 */
export interface User extends Entity {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
}

export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest',
}

/**
 * User DTO for creation
 */
export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  role?: UserRole;
}

/**
 * User DTO for update
 */
export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  isActive?: boolean;
}

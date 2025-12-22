export interface CreateUserType {
  email: string;
  fullName: string;
  role: Role;
}

export interface UserType extends CreateUserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  STUDENT = "STUDENT",
  LECTURER = "LECTURER",
  ADMIN = "ADMIN",
}

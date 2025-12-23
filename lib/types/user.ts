export interface CreateUserType {
  name: string;
  role: Role;
}

export interface UserType extends CreateUserType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  GUEST = "GUEST",
  ADMIN = "ADMIN",
}

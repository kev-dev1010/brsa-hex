import { UserRole } from "../../domain/entities/user/UserRole";

export interface ICreateUserInPort {
  name: string;
  email: string;
  role: UserRole;
}
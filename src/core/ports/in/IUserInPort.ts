import { UserRole } from "../../domain/entities/user/UserRole";

export interface IUserInPort {
  name: string;
  email: string;
  role: UserRole;
}
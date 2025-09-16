import { User } from "../../domain/entities/user/User";

export interface IUserRepository {

  save(user: User): Promise<User>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findAll(): Promise<User[]>;

  deleteById(id: string): Promise<void>;

}
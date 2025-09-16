// src/core/application/useCases/users/CRUD/GetAllUsersUseCase.ts

import { User } from '../../../../domain/entities/user/User';
import { IUserRepository } from '../../../../ports/out/IUserRepository';

/**
 * @class GetAllUsersUseCase
 * @description Caso de uso para buscar todos os usuários.
 */
export class GetAllUsersUseCase {
  /**
   * @constructor
   * @param {IUserRepository} userRepository - O repositório de usuários.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executa o caso de uso.
   * @returns {Promise<User[]>} Uma lista de todos os usuários.
   */
  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}

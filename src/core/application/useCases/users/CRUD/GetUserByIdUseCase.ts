// src/core/application/useCases/users/CRUD/GetUserByIdUseCase.ts

import { User } from '../../../../domain/entities/user/User';
import { IUserRepository } from '../../../../ports/out/IUserRepository';

/**
 * @class GetUserByIdUseCase
 * @description Caso de uso para buscar um usuário pelo seu ID.
 */
export class GetUserByIdUseCase {
  /**
   * @constructor
   * @param {IUserRepository} userRepository - O repositório de usuários.
   */
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executa o caso de uso.
   * @param {string} id - O ID do usuário a ser buscado.
   * @returns {Promise<User | null>} O usuário encontrado ou nulo.
   */
  async execute(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}

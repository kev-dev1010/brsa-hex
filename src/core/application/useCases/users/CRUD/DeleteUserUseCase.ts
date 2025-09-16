// src/core/application/useCases/users/CRUD/DeleteUserUseCase.ts

import { IUserRepository } from '../../../../ports/out/IUserRepository';

/**
 * @class DeleteUserUseCase
 * @description Caso de uso para deletar um usuário.
 */
export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executa o caso de uso.
   * @param {string} id - O ID do usuário a ser deletado.
   * @returns {Promise<void>}
   */
  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return this.userRepository.deleteById(id);
  }
}

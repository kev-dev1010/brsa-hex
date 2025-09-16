// src/core/application/useCases/users/CRUD/UpdateUserUseCase.ts

import { User, UserRole } from '../../../../domain/entities/user/User';
import { IUserRepository } from '../../../../ports/out/IUserRepository';

// Define o que o caso de uso espera receber para atualizar um usuário
interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
}

/**
 * @class UpdateUserUseCase
 * @description Caso de uso para atualizar um usuário existente.
 */
export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executa o caso de uso.
   * @param {string} id - O ID do usuário a ser atualizado.
   * @param {UpdateUserRequest} data - Os dados para atualizar.
   * @returns {Promise<User>} O usuário atualizado.
   */
  async execute(id: string, data: UpdateUserRequest): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    // Impede a alteração do email se um novo email for fornecido e já existir
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error('O novo email já está em uso.');
      }
    }

    const updatedUser = { ...user, ...data };

    return this.userRepository.save(updatedUser);
  }
}

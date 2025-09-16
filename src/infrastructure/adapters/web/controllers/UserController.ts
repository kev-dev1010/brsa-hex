// src/infrastructure/adapters/web/UserController.ts

import { Request, Response } from 'express';
// Importa todos os casos de uso de uma vez, aproveitando o 'index.ts'
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from '../../../../core/application/useCases/users';
import { IUserInPort } from '../../../../core/ports/in/IUserInPort';

// Agrupa todos os casos de uso de usuário em um único tipo para organização
type UserUseCases = {
  createUserUseCase: CreateUserUseCase;
  getAllUsersUseCase: GetAllUsersUseCase;
  getUserByIdUseCase: GetUserByIdUseCase;
  updateUserUseCase: UpdateUserUseCase;
  deleteUserUseCase: DeleteUserUseCase;
};

export class UserController {
  // O controller agora recebe um objeto contendo todos os casos de uso.
  constructor(private readonly useCases: UserUseCases) {}

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, role } = req.body as IUserInPort;

      // Acessa o caso de uso específico através do objeto 'useCases'
      const newUser = await this.useCases.createUserUseCase.execute({ name, email, role });
      return res.status(201).json(newUser);

    } catch (error: any) {
      if (error.message === 'Email already in use.') {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.useCases.getAllUsersUseCase.execute();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.useCases.getUserByIdUseCase.execute(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedUser = await this.useCases.updateUserUseCase.execute(id, data);
      return res.status(200).json(updatedUser);

    } catch (error: any) {
      if (error.message === 'Usuário não encontrado.') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'O novo email já está em uso.') {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.useCases.deleteUserUseCase.execute(id);
      // Retorna 204 No Content, que é o padrão para exclusões bem-sucedidas.
      return res.status(204).send();

    } catch (error: any) {
      if (error.message === 'Usuário não encontrado.') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}

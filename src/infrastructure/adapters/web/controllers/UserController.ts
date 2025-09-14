// src/infrastructure/adapters/web/UserController.ts

import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../../core/application/useCases/users/CreateUserUseCase';
import { ICreateUserInPort } from '../../../../core/ports/in/ICreateUserInPort';

export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, role } = req.body as ICreateUserInPort;

      const newUser = await this.createUserUseCase.execute({ name, email, role });
      return res.status(201).json(newUser);

    } catch (error: any) {
      if (error.message === 'Email already in use.') {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
  }
}

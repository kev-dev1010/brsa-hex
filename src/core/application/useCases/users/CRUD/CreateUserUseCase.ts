// src/core/application/useCases/users/CRUD/CreateUserUseCase.ts

import { v4 as uuidv4 } from 'uuid';
import { User, UserRole } from '../../../../domain/entities/user/User';
import { IUserRepository } from '../../../../ports/out/IUserRepository';

// Define o que o caso de uso espera receber para criar um usuário
interface CreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
}

// Define o que o caso de uso vai retornar
type CreateUserResponse = User;

export class CreateUserUseCase {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    // Injeção de Dependência: O caso de uso recebe o repositório como dependência.
    // Ele sabe que o objeto `userRepository` implementa a interface IUserRepository,
    // mas não se importa se ele usa JSON, MySQL ou MongoDB.
    this.userRepository = userRepository;
  }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // 1. Lógica de Negócio: Verificar se o e-mail já existe
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      // Poderíamos lançar um erro mais específico, mas para começar, isso é suficiente.
      throw new Error('Email Já existe.');
    }

    // 2. Criar a entidade do nosso domínio
    const newUser: User = {
      id: uuidv4(), // Geramos um ID único e seguro
      name: request.name,
      email: request.email,
      role: request.role,
    };

    // 3. Persistir os dados usando a porta (o repositório)
    const createdUser = await this.userRepository.save(newUser);

    // 4. Retornar a entidade criada
    return createdUser;
  }
}

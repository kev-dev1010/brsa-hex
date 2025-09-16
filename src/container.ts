// src/container.ts

/**
 * Este arquivo atua como um contêiner de Injeção de Dependência (DI).
 * Ele é responsável por instanciar e fornecer todas as classes
 * necessárias para a aplicação, como repositórios, casos de uso e controllers.
 * Centralizar a criação de instâncias aqui torna o gerenciamento de dependências
 * mais fácil e o código mais organizado.
 */

// Importações das classes que serão instanciadas
import { JsonUserRepository } from './infrastructure/adapters/database/JsonUserRepository';
// Importa todos os casos de uso de uma só vez, aproveitando o index.ts
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from './core/application/useCases/users';
import { UserController } from './infrastructure/adapters/web/controllers/UserController';
import { AppController } from './infrastructure/adapters/web/controllers/AppController';

// --- Repositórios ---
// Instancia o repositório de usuário. Se trocarmos para MySQL, só mudamos aqui.
const userRepository = new JsonUserRepository();

// --- Casos de Uso ---
// Agrupa todos os casos de uso de usuário para facilitar a injeção no controller.
const userUseCases = {
  createUserUseCase: new CreateUserUseCase(userRepository),
  getAllUsersUseCase: new GetAllUsersUseCase(userRepository),
  getUserByIdUseCase: new GetUserByIdUseCase(userRepository),
  updateUserUseCase: new UpdateUserUseCase(userRepository),
  deleteUserUseCase: new DeleteUserUseCase(userRepository),
};

// --- Controllers ---
// Injeta o objeto com todos os casos de uso no controller de usuário.
const userController = new UserController(userUseCases);
const appController = new AppController();

// Exporta uma instância única do contêiner para ser usada em toda a aplicação (Singleton)
export const container = {
  userRepository,
  // Exporta o objeto de casos de uso para possível uso em outros lugares
  userUseCases,
  userController,
  appController,
};

// Exporta um tipo para o contêiner, para que possamos usá-lo com tipagem segura
// em outras partes da aplicação, como nos módulos de rota.
export type AppContainer = typeof container;

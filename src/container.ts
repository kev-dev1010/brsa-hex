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
import { CreateUserUseCase } from './core/domain/useCases/CreateUserUseCase';
import { UserController } from './infrastructure/adapters/web/controllers/UserController';
import { AppController } from './infrastructure/adapters/web/controllers/AppController';

// --- Repositórios ---
const userRepository = new JsonUserRepository();

// --- Casos de Uso ---
const createUserUseCase = new CreateUserUseCase(userRepository);

// --- Controllers ---
const userController = new UserController(createUserUseCase);
const appController = new AppController();

// Exporta uma instância única do contêiner para ser usada em toda a aplicação (Singleton)
export const container = {
  userRepository,
  createUserUseCase,
  userController,
  appController,
};

// Exporta um tipo para o contêiner, para que possamos usá-lo com tipagem segura
// em outras partes da aplicação, como nos módulos de rota.
export type AppContainer = typeof container;

import { JsonUserRepository } from './infrastructure/adapters/database/JsonUserRepository';
import { CreateUserUseCase } from './core/domain/useCases/CreateUserUseCase';
import { UserController } from './infrastructure/adapters/web/controllers/UserController';
import { AppController } from './infrastructure/adapters/web/controllers/AppController';
import { createApiRouter } from './infrastructure/adapters/web/routes';
import { startServer } from './infrastructure/server';

// 1. Instanciar o Repositório (Adapter de Saída)
const userRepository = new JsonUserRepository();

// 2. Instanciar o Caso de Uso (Core) e injetar o repositório
const createUserUseCase = new CreateUserUseCase(userRepository);

// 3. Instanciar os Controllers (Adapter de Entrada) e injetar os casos de uso
const userController = new UserController(createUserUseCase);
const appController = new AppController();

// 4. Criar o roteador da API e injetar os controllers
const apiRouter = createApiRouter(userController, appController);

// 5. Iniciar o servidor
// (Boa prática: usar variáveis de ambiente para a porta)
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
startServer(apiRouter, PORT);

console.log('Application setup complete. Server is starting...');

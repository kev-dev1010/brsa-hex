// src/infrastructure/web/routes/user.routes.ts

import { Router } from 'express';
import { IRouteModule } from './types';
import { AppContainer } from '../../../../container';

/**
 * Módulo de rotas para as funcionalidades de Usuário.
 * Segue o contrato IRouteModule para permitir o carregamento automático.
 */
const userModule: IRouteModule = {
  // Define o caminho base para este módulo
  path: '/users',

  // Define a função que cria o roteador
  getRouter: (container: AppContainer): Router => {
    const router = Router();

    // Pega o controller necessário do contêiner de dependências
    const { userController } = container;

    // Define as rotas específicas deste módulo, garantindo o contexto do 'this' com .bind()
    router.post('/', userController.createUser.bind(userController));

    return router;
  },
};

export default userModule;

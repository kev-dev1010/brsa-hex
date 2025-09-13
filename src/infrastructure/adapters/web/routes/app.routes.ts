// src/infrastructure/web/routes/app.routes.ts

import { Router } from 'express';
import { IRouteModule } from './types'; // Importa o nosso novo contrato
import { AppContainer } from '../../../../container';

/**
 * Módulo de rotas para as funcionalidades gerais da aplicação (ex: rota raiz).
 * Segue o contrato IRouteModule para permitir o carregamento automático.
 */
const appModule: IRouteModule = {
  // Define o caminho base para este módulo
  path: '/',

  // Define a função que cria o roteador
  getRouter: (container: AppContainer): Router => {
    const router = Router();

    // Pega o controller necessário do contêiner de dependências
    const { appController } = container;

    // Define as rotas específicas deste módulo
    router.get('/', appController.welcomeMessage);

    return router;
  },
};

export default appModule;

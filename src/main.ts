// src/main.ts

/**
 * Ponto de entrada principal da aplicação.
 * A responsabilidade deste arquivo é orquestrar a inicialização.
 */

import { container } from './container';
import { createApiRouter } from './infrastructure/adapters/web/routes';
import { startServer } from './infrastructure/server';

// IIFE (Immediately Invoked Function Expression) assíncrona para usar await no top-level
(async () => {
  try {
    console.log('Iniciando a montagem da aplicação...');

    // 1. Cria o roteador da API, que agora é assíncrono devido ao carregamento dinâmico.
    // Passamos o contêiner inteiro para ele.
    const apiRouter = await createApiRouter(container);

    // 2. Inicia o servidor com o roteador pronto
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    startServer(apiRouter, PORT);

    console.log('Aplicação iniciada com sucesso.');

  } catch (error) {
    console.error('Ocorreu um erro ao iniciar a aplicação:', error);
    process.exit(1);
  }
})();

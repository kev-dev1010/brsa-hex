// src/infrastructure/web/routes/types.ts

import { Router } from 'express';
import { AppContainer } from '../../../../container'; // Caminho corrigido

/**
 * Define o contrato que todo Módulo de Rota deve seguir.
 * Esta padronização é a chave para o carregamento automático de rotas.
 */
export interface IRouteModule {
  /**
   * O caminho base para todas as rotas dentro deste módulo.
   * Ex: '/users', '/products'
   */
  path: string;

  /**
   * Uma função factory que recebe o contêiner de dependências e retorna
   * um roteador Express totalmente configurado para este módulo.
   * @param container O contêiner de DI da aplicação.
   */
  getRouter(container: AppContainer): Router;
}

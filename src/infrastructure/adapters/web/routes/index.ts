// src/infrastructure/web/routes/index.ts

import { Router } from 'express';
import { AppContainer } from '../../../../container';
import { loadRouteModules } from './module.loader';

/**
 * Factory principal para o roteador da API.
 * Esta função é assíncrona porque ela carrega os módulos de rota dinamicamente.
 * 
 * @param container O contêiner de DI da aplicação.
 * @returns Uma promessa que resolve para o roteador Express principal.
 */
export async function createApiRouter(container: AppContainer): Promise<Router> {
  const router = Router();

  // Carrega todos os módulos de rota automaticamente
  const routeModules = await loadRouteModules();
  console.log('Módulos de rota encontrados:', routeModules.map(m => m.path));

  // Itera sobre cada módulo encontrado e o registra no roteador principal
  for (const module of routeModules) {
    // Usa o 'path' e a função 'getRouter' de cada módulo para configurar as rotas
    router.use(module.path, module.getRouter(container));
    console.log(`-> Rotas do módulo [${module.path}] carregadas.`);
  }

  return router;
}

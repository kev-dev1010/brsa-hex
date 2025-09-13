// src/infrastructure/web/routes/module.loader.ts

import fs from 'fs/promises';
import path from 'path';
import { IRouteModule } from './types';

/**
 * Carrega dinamicamente todos os Módulos de Rota de dentro deste diretório.
 * Esta função lê todos os arquivos, filtra aqueles que seguem a convenção
 * `.routes.ts` e os importa como IRouteModule.
 * 
 * @returns Uma promessa que resolve para um array de todos os módulos de rota encontrados.
 */
export async function loadRouteModules(): Promise<IRouteModule[]> {
  // Array que irá armazenar os módulos encontrados
  const modules: IRouteModule[] = [];

  // Lê todos os arquivos do diretório atual (__dirname)
  const files = await fs.readdir(__dirname);

  // Itera sobre cada arquivo encontrado
  for (const file of files) {
    // Verifica se o arquivo segue a convenção de um módulo de rota
    const isRouteModule = file.endsWith('.routes.ts');

    if (isRouteModule) {
      // Constrói o caminho completo para o arquivo a ser importado
      const modulePath = path.join(__dirname, file);
      
      // Importa o módulo dinamicamente. A keyword `import()` é assíncrona.
      const module = await import(modulePath);

      // Adiciona o export `default` (que deve ser nosso IRouteModule) ao array
      if (module.default) {
        modules.push(module.default);
      }
    }
  }

  return modules;
}

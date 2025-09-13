# Plano de Design e Refatoração da API

Este documento descreve o plano para o design da API da BRSA e a refatoração do sistema de inicialização para permitir um desenvolvimento mais escalável e modular.

## 1. Objetivo Principal

O objetivo é refatorar a inicialização da aplicação para que novas rotas, com seus controllers e dependências, possam ser adicionadas ao sistema com o mínimo de esforço e sem a necessidade de modificar arquivos centrais como o `main.ts`. O sistema deve ser capaz de "descobrir" e registrar os módulos de rotas automaticamente, seguindo o padrão Factory para a criação das instâncias.

## 2. Mapa de Rotas da API

Esta seção define a estrutura completa dos endpoints da API.

### Recursos Existentes

#### Geral
- **Endpoint:** `GET /api/`
  - **Descrição:** Rota de boas-vindas da API.
  - **Resposta de Sucesso:** `200 OK` com a mensagem "Bem-vindo à BRSA!".

#### Usuários (Users)
- **Endpoint:** `POST /api/users`
  - **Descrição:** Cria um novo usuário no sistema (inicialmente para funcionários/administradores).
  - **Corpo da Requisição:**
    ```json
    {
      "name": "string",
      "email": "string",
      "role": "string"
    }
    ```
  - **Resposta de Sucesso:** `201 Created` com o objeto do novo usuário.
  - **Respostas de Erro:**
    - `409 Conflict`: Se o e-mail já estiver em uso.
    - `500 Internal Server Error`: Para erros inesperados.

### Recursos a Desenvolver (Planejamento)

#### Produtos (Products)
- **Endpoint:** `GET /api/products`
  - **Descrição:** Retorna uma lista de todos os produtos.
- **Endpoint:** `GET /api/products/:id`
  - **Descrição:** Retorna um produto específico pelo seu ID.
- **Endpoint:** `POST /api/products`
  - **Descrição:** Cria um novo produto.
  - **Corpo da Requisição:** *(A ser definido)*
- **Endpoint:** `PUT /api/products/:id`
  - **Descrição:** Atualiza um produto existente.
  - **Corpo da Requisição:** *(A ser definido)*
- **Endpoint:** `DELETE /api/products/:id`
  - **Descrição:** Remove um produto do sistema.

#### Clientes (Customers)
- **Endpoint:** `GET /api/customers`
  - **Descrição:** Retorna uma lista de todos os clientes.
- **Endpoint:** `GET /api/customers/:id`
  - **Descrição:** Retorna um cliente específico pelo seu ID.
- **Endpoint:** `POST /api/customers`
  - **Descrição:** Cria um novo cliente.
  - **Corpo da Requisição:** *(A ser definido)*
- **Endpoint:** `PUT /api/customers/:id`
  - **Descrição:** Atualiza um cliente existente.
  - **Corpo da Requisição:** *(A ser definido)*
- **Endpoint:** `DELETE /api/customers/:id`
  - **Descrição:** Remove um cliente do sistema.

#### Vendas (Sales)
- **Endpoint:** `POST /api/sales`
  - **Descrição:** Registra uma nova venda, associando um cliente a uma lista de produtos.
  - **Corpo da Requisição:** *(A ser definido, ex: { customerId: "...", products: [...] })*
- **Endpoint:** `GET /api/sales`
  - **Descrição:** Retorna uma lista de todas as vendas, com possibilidade de filtros.
- **Endpoint:** `GET /api/sales/:id`
  - **Descrição:** Retorna os detalhes de uma venda específica.

#### Entregas (Deliveries)
- **Endpoint:** `GET /api/deliveries`
  - **Descrição:** Retorna uma lista de todas as entregas, com filtros por status (pendente, a caminho, entregue).
- **Endpoint:** `GET /api/deliveries/:id`
  - **Descrição:** Retorna os detalhes de uma entrega específica.
- **Endpoint:** `PUT /api/deliveries/:id`
  - **Descrição:** Atualiza o status de uma entrega.
  - **Corpo da Requisição:** *(A ser definido, ex: { status: "a_caminho" })*

#### Recompensas (Rewards)
- **Endpoint:** `GET /api/customers/:id/rewards`
  - **Descrição:** Verifica o status do programa de recompensas para um cliente específico, retornando a contagem de itens e a elegibilidade para brinde.

---

## 3. Plano de Implementação (Factories)

O objetivo desta seção é detalhar o plano técnico para refatorar a aplicação, permitindo que novas features (rotas, controllers, etc.) sejam adicionadas de forma modular e automática, sem a necessidade de alterar arquivos centrais.

### Passo 1: Criação do Contêiner de Dependências

- **O quê:** Centralizar a criação de todas as instâncias (repositórios, casos de uso, controllers) em um único local, conhecido como "Contêiner de Injeção de Dependência" (DI Container).
- **Como:**
    1. Criar um arquivo `src/container.ts`.
    2. Neste arquivo, criar uma classe ou objeto `container` que terá a responsabilidade de instanciar e fornecer todas as classes da aplicação.
    3. O `main.ts` será simplificado para apenas pedir as instâncias necessárias ao contêiner, em vez de criá-las.
- **Objetivo:** Desacoplar o `main.ts` da lógica de construção dos objetos.

### Passo 2: Padronização dos Módulos de Rota

- **O quê:** Definir um contrato (interface) que todo módulo de rota deverá seguir.
- **Como:**
    1. Criar uma interface `IRouteModule` em um arquivo de tipos.
    2. A interface exigirá que cada módulo de rota exponha:
        - `path: string`: O caminho base do recurso (ex: `'/users'`).
        - `getRouter(container: AppContainer): Router`: Uma função factory que recebe o contêiner, usa-o para obter o controller necessário e retorna um roteador Express configurado.
- **Objetivo:** Criar um padrão consistente para todas as features.

### Passo 3: Implementação do Carregador de Módulos (Module Loader)

- **O quê:** Criar um mecanismo que descobre e carrega todos os módulos de rota automaticamente.
- **Como:**
    1. Criar um arquivo `src/infrastructure/web/routes/module.loader.ts`.
    2. Este arquivo terá uma função que usa o módulo `fs` do Node.js para ler o nome de todos os arquivos no diretório de rotas.
    3. Ele irá filtrar por arquivos que terminam em `.routes.ts`, importá-los dinamicamente (`await import(...)`), e extrair o `IRouteModule` de cada um.
    4. O resultado será um array de todos os módulos de rota da aplicação.

### Passo 4: Refatoração Final da Inicialização

- **O quê:** Juntar todas as peças.
- **Como:**
    1. O `routes/index.ts` será modificado para usar o `ModuleLoader`. Ele vai iterar sobre o array de módulos e registrar cada um no roteador principal do Express usando `router.use(module.path, module.getRouter(container))`.
    2. O `main.ts` final ficará extremamente simples: ele apenas irá instanciar o contêiner e iniciar o servidor.
- **Objetivo:** Ter um sistema de "plug-and-play" para novas features. Para adicionar "Produtos", basta criar os arquivos da feature e o `product.routes.ts` seguindo o padrão. O sistema o carregará automaticamente.

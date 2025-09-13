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

*(Esta seção irá detalhar o passo a passo técnico da refatoração. Começaremos a preencher após definirmos o mapa de rotas.)*

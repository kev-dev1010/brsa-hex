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

*(Aqui vamos listar os próximos recursos, como Produtos, Clientes, Vendas, etc.)*

---

## 3. Plano de Implementação (Factories)

*(Esta seção irá detalhar o passo a passo técnico da refatoração. Começaremos a preencher após definirmos o mapa de rotas.)*

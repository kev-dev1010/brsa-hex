# BRSA Backend Hex

Backend para o sistema de gestão da BRSA, desenvolvido com Node.js, TypeScript e Arquitetura Hexagonal.

## 1. Visão Geral da Arquitetura

Este projeto utiliza a **Arquitetura Hexagonal (Portas e Adaptadores)**. O objetivo é isolar a lógica de negócio principal (o "core") das dependências externas, como o framework web (Express), o banco de dados, etc.

O fluxo de uma requisição segue o seguinte caminho:

`Requisição HTTP -> Rota (Express) -> Controller -> Caso de Uso (Use Case) -> Repositório (Interface) -> Implementação do Repositório -> Banco de Dados`

- **Core (Domínio):** Contém a lógica de negócio pura, sem depender de nada externo.
- **Infraestrutura:** Contém os "adaptadores" que implementam as "portas" definidas no core. É aqui que o Express, o acesso ao banco de dados e outras tecnologias vivem.

## 2. Estrutura de Diretórios

```
/
├── data/                # Dados locais (ex: banco de dados em JSON)
├── docs/                # Documentação adicional do projeto
├── src/
│   ├── core/
│   │   ├── domain/
│   │   │   ├── entities/  # Entidades de negócio (ex: User)
│   │   │   └── useCases/  # Casos de uso da aplicação (ex: CreateUser)
│   │   └── ports/
│   │       ├── in/      # Portas de entrada (interfaces para os casos de uso)
│   │       └── out/     # Portas de saída (interfaces para repositórios)
│   ├── infrastructure/
│   │   ├── adapters/
│   │   │   ├── database/  # Implementações das portas de saída (ex: JsonUserRepository)
│   │   │   └── web/       # Adaptadores de entrada (Express)
│   │   │       ├── controllers/ # Controllers que recebem requisições
│   │   │       └── routes/      # Definição das rotas da API
│   │   ├── server.ts      # Configuração e inicialização do servidor Express
│   └── main.ts            # Ponto de entrada da aplicação, onde tudo é conectado
├── package.json         # Dependências e scripts do projeto
└── tsconfig.json        # Configurações do compilador TypeScript
```

## 3. Arquivos de Configuração

- **`package.json`**: Gerencia as dependências do Node.js e define scripts úteis (como `start`, `test`, etc.).
- **`tsconfig.json`**: Define as regras para o compilador TypeScript, garantindo que o código seja consistente e livre de erros comuns.

## 4. Como Rodar o Projeto

1.  **Instalar Dependências:**
    ```bash
    npm install
    ```
2.  **Executar em Modo de Desenvolvimento:**
    ```bash
    npx ts-node src/main.ts
    ```
    O servidor estará disponível em `http://localhost:3000`.

## 5. Fluxo de Desenvolvimento

1.  **Criar uma Branch:** Toda nova funcionalidade ou correção deve ser feita em uma nova branch.
    ```bash
    git checkout -b <tipo>/<nome-da-feature>
    # Ex: git checkout -b feature/gerenciamento-produtos
    ```
2.  **Desenvolver a Funcionalidade:** Siga a arquitetura, criando as entidades, casos de uso, controllers e rotas necessários.
3.  **Documentar:** Atualize a documentação relevante (como o `API_DESIGN_PLAN.md` ou o `DATA_MODELS.md`) com as novas mudanças.
4.  **Commit e Push:** Faça o commit das suas alterações com uma mensagem clara e envie para o repositório.
5.  **Pull Request:** Abra um Pull Request para a branch principal para que as alterações possam ser revisadas e integradas.

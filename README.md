# BRSA Backend Hex

Backend para o sistema de gestão da BRSA, desenvolvido com Node.js, TypeScript e Arquitetura Hexagonal.

## 1. A Jornada de uma Requisição (Fluxo da Arquitetura)

Este projeto utiliza a **Arquitetura Hexagonal (Portas e Adaptadores)** para isolar a lógica de negócio das tecnologias externas. Abaixo, a jornada completa de uma requisição `POST /api/users`:

### Estação 1: `main.ts` (O Ponto de Partida e o "Montador")
- **O que faz?** Inicia e monta a aplicação, conectando todas as peças através da **Injeção de Dependência**.
- **Como?**
    1.  `new JsonUserRepository()`: Cria o adaptador que fala com o `users.json`.
    2.  `new CreateUserUseCase(userRepository)`: Cria a lógica de negócio, injetando o repositório.
    3.  `new UserController(createUserUseCase)`: Cria o controller, injetando a lógica de negócio.
    4.  `createApiRouter(...)`: Monta o roteador principal com os controllers.
    5.  `startServer(...)`: Inicia o servidor com as rotas prontas.

### Estação 2: `server.ts` (O Porteiro)
- **O que faz?** Cria e configura o servidor Express.
- **Como?** Aplica middlewares globais (como `express.json()`) e anexa o roteador principal a um prefixo (ex: `/api`).

### Estação 3: `routes/index.ts` (O Roteador Principal)
- **O que faz?** Distribui as requisições para os roteadores de cada feature.
- **Como?** Usa `router.use('/users', userRoutes)` para dizer: "requisições para `/users` devem ser gerenciadas pelo roteador de usuários".

### Estação 4: `routes/user.routes.ts` (O Roteador da Feature)
- **O que faz?** Define os caminhos e verbos HTTP para a feature de usuários.
- **Como?** Mapeia um endpoint a um método do controller: `router.post('/', userController.createUser.bind(userController))`. O `.bind()` é crucial para manter o contexto do `this`.

### Estação 5: `controllers/UserController.ts` (O Maestro)
- **O que faz?** Orquestra a interação entre o mundo HTTP e a lógica de negócio.
- **Como?** Recebe `req` e `res`, extrai dados (`req.body`), chama o caso de uso (`this.createUserUseCase.execute(...)`) e envia a resposta HTTP (`res.status(201).json(...)`).

### Estação 6: `core/domain/useCases/CreateUserUseCase.ts` (O Cérebro)
- **O que faz?** Executa a lógica de negócio pura, sem conhecer tecnologias externas.
- **Como?** Recebe dados, aplica regras e usa a interface `IUserRepository` para persistir informações.

### Estação 7: `core/ports/out/IUserRepository.ts` (O Contrato)
- **O que faz?** É uma interface TypeScript que define o que um repositório de usuário *deve* fazer (ex: `save`), mas não *como*.

### Estação 8: `infrastructure/adapters/database/JsonUserRepository.ts` (O Trabalhador)
- **O que faz?** É a implementação do contrato `IUserRepository`.
- **Como?** Sabe como ler e escrever dados em um arquivo JSON específico. Se trocarmos para MySQL, apenas este tipo de arquivo muda.

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

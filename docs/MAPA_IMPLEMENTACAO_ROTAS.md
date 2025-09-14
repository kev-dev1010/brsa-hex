Mapa de Implementação de uma Nova Rota (ex: User)

Fluxo que qualquer dev deve seguir ao implementar uma nova feature:

Definir a entidade no core

Criar arquivo em src/core/domain/entities/user/User.ts.

Adicionar propriedades, construtor e invariantes.

Criar os DTOs (request/response)

Em docs/DATA_MODELS.md, definir CreateUserDTO, UserResponseDTO.

Opcionalmente criar pasta src/core/domain/user/dto/ para tipagens de entrada/saída.

Definir portas (ports)

Entrada → ICreateUserInPort.ts (interface que o caso de uso expõe).

Saída → IUserRepository.ts (interface que abstrai persistência).

Implementar o caso de uso (useCase)

Criar CreateUserUseCase.ts em src/core/domain/user/useCases/.

Classe recebe IUserRepository no construtor.

Implementa regra de negócio (ex: verificar duplicação de email, salvar user).

Implementar o repositório (adaptador de saída)

Ex: JsonUserRepository.ts em infrastructure/adapters/database/.

Implementa IUserRepository.

Persistência inicial em JSON, depois poderá ser substituído por DB real.

Criar o controller (adaptador de entrada)

Ex: UserController.ts em infrastructure/adapters/web/controllers/.

Recebe CreateUserUseCase via container.

Converte req.body em CreateUserDTO, chama execute, devolve resposta padronizada.

Definir a rota

Criar user.routes.ts em infrastructure/adapters/web/routes/.

Implementar IRouteModule com path: '/users' e getRouter(container).

Definir POST /users chamando UserController.create().

Registro automático

module.loader.ts descobre user.routes.ts e carrega sem mexer em main.ts.

Testar fluxo completo

Criar usuário via POST /api/v1/users.

Validar respostas (201, 409, etc.).

Documentar

Atualizar API_DESIGN_PLAN.md e DATA_MODELS.md com rotas, DTOs e responses.
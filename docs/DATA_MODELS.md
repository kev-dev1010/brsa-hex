# Dicionário de Dados e Modelos

Este documento serve como um dicionário central para todas as entidades, tipos e estruturas de dados utilizados no projeto BRSA Backend.

---

## Entidades

Entidades representam os objetos de negócio fundamentais do sistema.

### User

Representa um usuário do sistema, que pode ser um funcionário ou administrador.

- **Localização:** `src/core/domain/entities/user/User.ts`

| Propriedade | Tipo       | Descrição                               | Exemplo                  |
|-------------|------------|-----------------------------------------|--------------------------|
| `id`        | `string`   | Identificador único do usuário (UUID).  | `"a1b2c3d4-e5f6-..."`    |
| `name`      | `string`   | Nome do usuário.                        | `"Kevin"`                |
| `email`     | `string`   | Endereço de e-mail único do usuário.    | `"kevin@brsa.com"`       |
| `role`      | `UserRole` | Nível de permissão do usuário.          | `"admin"`                |
| `createdAt` | `Date`     | Data e hora em que o usuário foi criado. | `2025-09-13T10:00:00Z`   |

---

## Enums

Enums (enumerações) são usados para definir um conjunto de constantes nomeadas.

### UserRole

Define os possíveis papéis que um usuário pode ter no sistema.

- **Localização:** `src/core/domain/entities/user/UserRole.ts`

| Valor     | Descrição                                     |
|-----------|-----------------------------------------------|
| `"admin"` | Acesso total ao sistema.                      |
| `"staff"` | Acesso limitado para operações do dia a dia.  |

---

## DTOs (Data Transfer Objects)

*(Esta seção será usada para documentar objetos que transferem dados entre as camadas, como os dados que chegam no corpo de uma requisição POST.)*

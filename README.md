# Minha Pokédex — Atividade 04

Aplicação full stack para consulta e gerenciamento dos Pokémon da primeira geração, desenvolvida com React + Vite, Spring Boot e MongoDB.

## Funcionalidades

- Listagem dos Pokémon consumidos pela API REST.
- Busca por nome ou número da Pokédex.
- Filtro por tipo.
- Visualização dos atributos e detalhes.
- Cadastro, edição e exclusão de Pokémon com persistência no MongoDB.
- Área de treinadores com insígnias e equipes.
- Favoritos salvos no navegador com `localStorage`.

## Tecnologias

- Frontend: React, Vite, JavaScript e CSS.
- Backend: Java 25, Spring Boot, Spring Web MVC e Spring Data MongoDB.
- Banco de dados: MongoDB Atlas.
- Dados de origem: `Script_Pokedex.sql`.

## Estrutura

```text
.
├── frontend/       # Aplicação React + Vite
├── backend/        # API REST Spring Boot
├── Script_Pokedex.sql
└── README.md
```

## Pré-requisitos

- Node.js e npm.
- Java 25.
- Maven.
- Uma instância MongoDB acessível (por exemplo, MongoDB Atlas).

## Configuração do MongoDB

O backend lê a conexão pela variável de ambiente `MONGODB_URI`. Não coloque usuário, senha ou URI diretamente no código nem em arquivos versionados.

No PowerShell, configure a variável para a sessão atual:

```powershell
$env:MONGODB_URI = "sua-uri-de-conexao-do-mongodb"
```

A aplicação utiliza o banco `pokedex`. A primeira inicialização importa os 151 Pokémon e os 12 treinadores quando as respectivas coleções estão vazias. Se os documentos já existirem, a carga inicial é ignorada para não sobrescrever alterações feitas pela API.

Os dados de origem estão documentados em `Script_Pokedex.sql`; o script é uma fonte de dados SQL e não deve ser executado diretamente no MongoDB.

## Executar o backend

Em um terminal PowerShell:

```powershell
cd backend
mvn spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

## Executar o frontend

Em outro terminal PowerShell:

```powershell
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

O frontend está configurado para consumir a API em `http://localhost:8080`.

## Endpoints

### Pokémon

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/pokemons` | Lista os Pokémon |
| GET | `/api/pokemons/{id}` | Busca um Pokémon |
| POST | `/api/pokemons` | Cadastra um Pokémon |
| PUT | `/api/pokemons/{id}` | Atualiza um Pokémon |
| DELETE | `/api/pokemons/{id}` | Exclui um Pokémon |

### Treinadores

| Método | Rota | Descrição |
|---|---|---|
| GET | `/api/trainers` | Lista os treinadores |
| GET | `/api/trainers/{id}` | Busca um treinador |

## Verificações

Backend:

```powershell
cd backend
mvn clean test
```

Frontend:

```powershell
cd frontend
npm run build
npm run lint
```

Para validar a integração, mantenha backend e frontend em execução e confira as rotas `/api/pokemons` e `/api/trainers`. A conexão com o MongoDB Atlas depende da URI válida, da disponibilidade do cluster e da liberação do IP de origem na lista de acesso do Atlas.

## Observações

- As imagens dos Pokémon são carregadas de recursos externos da PokéAPI.
- As imagens dos treinadores são carregadas dos sprites do Pokémon Showdown.
- Favoritos são armazenados localmente no navegador e não são sincronizados com o MongoDB.
- Projeto acadêmico, sem vínculo oficial com a franquia Pokémon.

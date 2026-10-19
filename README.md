# Minha Pokédex

Aplicação web desenvolvida com **React + Vite** para explorar Pokémon, consultar seus atributos, conhecer treinadores e organizar uma coleção de favoritos.

O projeto apresenta uma Pokédex com os 151 Pokémon da primeira geração, permitindo buscar criaturas pelo nome ou número, filtrar por tipo, visualizar informações detalhadas e salvar favoritos no navegador. Também possui uma área dedicada aos treinadores, com suas imagens, insígnias e equipes Pokémon.

## Funcionalidades

A aplicação permite:

- visualizar os 151 Pokémon da primeira geração;
- buscar Pokémon pelo nome ou número;
- filtrar os resultados por tipo;
- consultar os tipos e os atributos de cada Pokémon;
- visualizar os atributos de HP, ataque, defesa, ataque especial, defesa especial e velocidade;
- acompanhar os atributos por meio de barras visuais;
- abrir uma área com informações detalhadas do Pokémon selecionado;
- adicionar e remover Pokémon dos favoritos;
- manter os favoritos salvos no navegador utilizando `localStorage`;
- navegar entre as abas Pokédex, Treinadores e Favoritos;
- visualizar treinadores, suas imagens, quantidade de insígnias e equipes Pokémon.

## Tecnologias

- JavaScript
- React
- Vite
- HTML5
- CSS3
- Fetch API
- LocalStorage

## Dependências

As dependências e os comandos do projeto estão configurados no arquivo `package.json`.

### React

Utilizado para construir a interface da aplicação em componentes reutilizáveis e controlar os estados da interface.

### Vite

Responsável pelo ambiente de desenvolvimento e pela geração da versão de produção da aplicação.

### PokéAPI

Utilizada para obter as imagens oficiais dos Pokémon por meio de requisições à API.

Referência: [PokéAPI](https://pokeapi.co/)

### Pokémon Showdown

As imagens dos treinadores são carregadas a partir da biblioteca de sprites do Pokémon Showdown.

Referência: [Pokémon Showdown — Sprites de treinadores](https://play.pokemonshowdown.com/sprites/trainers/)

As imagens externas dependem da disponibilidade dos respectivos endereços. Os personagens e elementos visuais de Pokémon pertencem aos seus respectivos titulares; este é um projeto acadêmico, sem vínculo oficial com a franquia.

## Estrutura do Projeto

A aplicação está organizada da seguinte maneira:

```text
Pokédex_React_Vite/
├── README.md
└── pokedex-react/
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── eslint.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── assets/
        │   └── images/
        ├── components/
        │   ├── PokemonCard.jsx
        │   ├── PokemonDetails.jsx
        │   ├── PokemonList.jsx
        │   ├── SearchBar.jsx
        │   ├── TrainerList.jsx
        │   └── TypeFilter.jsx
        ├── css/
        │   ├── App.css
        │   ├── PokemonCard.css
        │   ├── PokemonDetails.css
        │   ├── PokemonList.css
        │   ├── SearchBar.css
        │   ├── TrainerList.css
        │   └── TypeFilter.css
        └── data/
            └── pokedex-data.json
```

### Organização dos componentes

- **`App.jsx`**: controla as abas, a busca, o filtro por tipo, o Pokémon selecionado e a lista de favoritos.
- **`PokemonList.jsx`**: apresenta a lista de Pokémon recebida por propriedades.
- **`PokemonCard.jsx`**: exibe as informações resumidas de cada Pokémon, carrega sua imagem e permite favoritar ou abrir os detalhes.
- **`PokemonDetails.jsx`**: apresenta os tipos e atributos do Pokémon selecionado.
- **`SearchBar.jsx`**: permite pesquisar pelo nome ou número.
- **`TypeFilter.jsx`**: permite filtrar a lista por tipo.
- **`TrainerList.jsx`**: apresenta os treinadores, suas imagens, insígnias e equipes.
- **`pokedex-data.json`**: armazena os dados utilizados na aplicação, incluindo tipos, Pokémon, atributos, treinadores e identificadores dos Pokémon de cada equipe.

## Dados dos Pokémon

Os dados principais ficam no arquivo `src/data/pokedex-data.json`. Cada Pokémon possui identificador, nome, tipos e atributos numéricos.

Os atributos apresentados são:

| Atributo | Descrição |
| --- | --- |
| HP | Pontos de vida |
| Ataque | Atributo de ataque físico |
| Defesa | Atributo de defesa física |
| Ataque especial | Atributo de ataque especial |
| Defesa especial | Atributo de defesa especial |
| Velocidade | Atributo de velocidade |

As imagens dos Pokémon são obtidas separadamente pela PokéAPI, usando o identificador de cada Pokémon. Por isso, é necessária uma conexão com a internet para carregar essas imagens.

## Busca e Filtro por Tipo

A busca permite localizar um Pokémon pelo nome ou pelo número da Pokédex. O filtro por tipo pode ser utilizado sozinho ou em conjunto com a busca, restringindo os resultados às opções selecionadas.

Quando nenhum Pokémon corresponde aos critérios informados, a aplicação exibe uma mensagem indicando que nenhum resultado foi encontrado.

## Favoritos

Cada card de Pokémon possui um controle para adicionar ou remover a criatura dos favoritos. A quantidade de favoritos também aparece na aba correspondente.

Os identificadores selecionados são armazenados no `localStorage` do navegador com a chave `pokedex-favorites`. Assim, os favoritos continuam disponíveis após atualizar a página no mesmo navegador, desde que os dados locais não sejam apagados.

## Treinadores Pokémon

A seção de treinadores apresenta personagens como Ash, Brock, Misty, Lt. Surge, Erika, Koga, Sabrina, Blaine, Giovanni, Gary, Team Rocket e Lance.

Para cada treinador, a aplicação exibe a imagem, a quantidade de insígnias registrada nos dados do projeto e a equipe relacionada. A equipe é montada a partir dos identificadores presentes no arquivo `pokedex-data.json`, que são associados aos dados dos Pokémon.

As imagens dos treinadores são carregadas do Pokémon Showdown. A disponibilidade dessas imagens depende do serviço externo.

## Como Executar

### Pré-requisitos

- Node.js instalado;
- npm instalado;
- conexão com a internet para carregar as imagens externas.

### VS Code

1. Extraia ou abra a pasta do projeto no VS Code.
2. Abra o terminal integrado.
3. Entre na pasta `pokedex-react`.
4. Instale as dependências.
5. Inicie o servidor de desenvolvimento.

```bash
cd pokedex-react
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação, geralmente:

```text
http://localhost:5173/
```

Abra esse endereço no navegador.

### Gerar a versão de produção

Para verificar a compilação de produção, execute dentro da pasta `pokedex-react`:

```bash
npm run build
```

Os arquivos gerados serão armazenados na pasta `dist`.

Para executar uma prévia da versão compilada:

```bash
npm run preview
```

## Fluxo de Teste

Uma sequência simples para testar a aplicação é:

1. abrir a aba **Pokédex**;
2. pesquisar um Pokémon pelo nome;
3. pesquisar outro Pokémon pelo número;
4. selecionar um tipo e verificar os resultados;
5. abrir um card para consultar os detalhes do Pokémon;
6. adicionar um Pokémon aos favoritos;
7. acessar a aba **Favoritos** e verificar se ele aparece;
8. atualizar a página e conferir se os favoritos foram mantidos;
9. remover um Pokémon dos favoritos;
10. acessar a aba **Treinadores** e conferir as imagens, as insígnias e as equipes.

## Observações

- Os dados principais dos Pokémon e dos treinadores estão armazenados localmente no arquivo JSON do projeto.
- As imagens dos Pokémon e dos treinadores são carregadas de serviços externos, portanto precisam de conexão com a internet.
- Os favoritos são armazenados localmente no navegador e não são sincronizados entre dispositivos.
- O projeto não possui backend ou banco de dados próprio.

## Referências

- [PokéAPI](https://pokeapi.co/) — dados e imagens dos Pokémon.
- [Pokémon Showdown — Sprites de treinadores](https://play.pokemonshowdown.com/sprites/trainers/) — imagens dos treinadores.

## Licença

Este projeto foi desenvolvido para fins acadêmicos e de aprendizagem. Pokémon e seus personagens são propriedades de seus respectivos titulares. As referências externas são indicadas para reconhecimento das fontes utilizadas.

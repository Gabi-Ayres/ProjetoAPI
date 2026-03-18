# Projeto - API Sistema de Tarefas
## Nome: Gabriella Ayres

## Descrição

Esta é uma API backend desenvolvida em Node.js usando o framework Express. O objetivo deste projeto é fornecer os endpoints necessários para gerenciar um sistema de [descreva o sistema, ex: tarefas colaborativas], incluindo o controle de usuários, tarefas, tags e comentários. Ainda segue em desenvolvimento.

## Pré-requisitos

Para rodar este projeto, você precisará ter instalado:
- Node.js (v14 ou superior recomendada)
- npm 

## Instalação e Configuração

1. Clone o repositório:
   git clone https://github.com/Gabi-Ayres/ProjetoAPI.git

2. Acesse a pasta do projeto:
   cd [BACKEND]

3. Instale as dependências:
   npm install

## Como Executar

Para iniciar o servidor em modo de desenvolvimento:
npm run dev

A API estará disponível em `http://localhost:3000`.

## Principais Endpoints

A API utiliza JSON para envio e recebimento de dados. 

### rotas (/users)
- router.get("/", usersController.getUsers);
- router.post("/",  usersController.createUser);
- router.put("/:id", checkUserExists, usersController.updateUser);
- router.delete("/:id", checkUserExists, usersController.deleteUser);
- router.patch("/:id",checkUserExists, usersController.updateUser);


### Tarefas (/tasks)
- GET /tasks: Lista todas as tarefas.
- POST /tasks: Cria uma nova tarefa.
- GET /tasks/:id: Detalhes de uma tarefa específica.
- PUT /tasks/:id: Atualiza uma tarefa.
- DELETE /tasks/:id: Remove uma tarefa.

### Tags (/tags)
- get("/", tagController.getAllTags);
- get("/:id/tasks", tagController.getTaskByTagId);
- post("/", tagController.createTag);
- delete("/:id", tagController.deleteTag);


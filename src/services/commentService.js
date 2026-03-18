// commentService.js
import * as taskService from "./taskService.js";
import * as userService from "./userService.js";

let comments = [];


export const getComments = (taskId) => {
  if (!taskId) {
    return comments.filter((comments) => comments.taskId === parseInt(taskId));
  }
};

export const getCommentsByTaskId = (taskId) => {
  // Pega todos os comentários
  const allComments = getComments();

  // Filtra apenas os comentários da task desejada
  const filteredComments = allComments
    .filter(c => c.taskId === parseInt(taskId));

  return filteredComments;
};


export const createComment = (taskId, userId, conteudo) => {
  // Verifica se a task existe
  const taskExists = taskService.getAllTasks().some(t => t.id === parseInt(taskId));
  if (!taskExists) {
    throw new Error("Task not found");
  }

  // Verifica se o usuário existe
  const userExists = userService.getAllUsers().some(u => u.id === parseInt(userId));
  if (!userExists) {
    throw new Error("User not found");
  }

  // Cria o comentário
  const comment = {
    id: commentIdCounter++,
    taskId: parseInt(taskId),
    userId: parseInt(userId),
    conteudo: conteudo,
    dataCriacao: new Date()
  };

  // Adiciona ao array de comentários
  comments.push(comment);

  return comment;
};


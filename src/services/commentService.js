import {getTaskById} from "./taskService.js";
import { getUserById } from "./userService.js";

let comments = [];
let commentIdCounter = 1;

export const getCommentsByTaskId = (taskId) => {
  // Pega todos os comentários
 // const allComments = getTaskById();

  // Filtra apenas os comentários da task desejada
  const filteredComments = comments.filter(c => c.taskId === parseInt(taskId));

  return filteredComments;
};


export const createComment = (taskId, userId, content) => {
  // Verifica se a task existe
  const taskExists = getTaskById(taskId).some(t => t.id === parseInt(taskId));
 
  if (!taskExists) {
    throw new Error("Task não existe");
  }

  // Verifica se o usuário existe
  const userExists = getUserById(userId).some(u => u.id === parseInt(userId));
  if (!userExists) {
    throw new Error("User não existe");
  }

  // Cria o comentário
  const newcomment = {
    id: commentIdCounter++,
    taskId: parseInt(taskId),
    userId: parseInt(userId),
    content: content,
    dataCriacao: new Date()
  };

  // Adiciona ao array de comentários
  comments.push(newcomment);

  return newcomment;
};


import * as taskService from "./taskService.js";

let tags = [];
let idTag = 0;

// Função para obter todas as tags
export const getAllTags = () => {
  return tags;
};

// Função para obter as tarefas associadas a uma tag específica
export const getTasksByTagId = (tagId) => {
  const filteredTags = taskService
    .getTaskTags()
    .filter((tt) => tt.tagId === parseInt(tagId));
  const filteredTasks = filteredTags.map((t) => t.taskId);
  const filteredTasksTags = taskService
    .getAllTasks()
    .filter((tt) => filteredTasks.includes(tt.id));
  return filteredTasksTags;
};

// Função para criar uma nova tag
export const createTag = (data) => {
  if (!data.name || data.name === "") {
    throw new Error("Nome da tag é obrigatório");
  }
  const newTag = {
    id: ++idTag,
    name: data.name,
  };

  tags.push(newTag);
  return newTag;
};

// Função para remover todas as associacões da tag e depois remover ela
export const deleteTag = (tagsId) => {
  taskService.taskTags = taskService.taskTags.filter(
    (tt) => tt.tagId !== parseInt(tagsId),
  );
  tags = tags.filter((t) => t.id !== parseInt(tagsId));
};

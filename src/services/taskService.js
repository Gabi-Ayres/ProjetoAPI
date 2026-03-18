import * as tagService from "./tagService.js";

let tasks = [];
let idCounter = 1;
export let taskTags = [];

// // Função para obter todos as tasks com busca e ordenação
export const getAllTasks = (search, sort) => {
  if (!search && !sort) {
    return tasks;
  }

  let orderedTask = [...tasks];

  if (typeof search === "string") {
    orderedTask = orderedTask.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()),
    );
  }
  if (sort === "asc") {
    orderedTask.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "desc") {
    orderedTask.sort((a, b) => b.title.localeCompare(a.title));
  }

  return orderedTask;
};

export const getTaskById = (id) => tasks.filter((t) => t.id === parseInt(id));

// Função para obter estatisticas
export const getTaskStats = () => {
  const tasks = getAllTasks();
  const taskPendentes = tasks.filter((t) => t.completed === false);
  const taskConcluidas = tasks.filter((t) => t.completed === true);
  const taskPorcentagem = (
    (taskConcluidas.length / tasks.length) *
    100
  ).toFixed(2);

  return {
    total: tasks.length,
    pendentes: taskPendentes.length,
    concluida: taskConcluidas.length,
    porcentagemConcluida: taskPorcentagem + "%",
  };
};

// Função para clonar as TasksTags
export const getTaskTags = () => {
  return [...taskTags];
};

// Função para criar uma Task
export const createTask = (data) => {
  const task = {
    id: idCounter++,
    title: data.title,
    categoria: data.categoria,
    completed: false,
    responsavelNome: data.responsavelNome,
    dataConclusao: null,
  };
  tasks.push(task);
  return task;
};

// Função para criar uma TaskTag
export const createTaskTag = (taskId, tagId) => {
  const taskTag = {
    taskId: parseInt(taskId),
    tagId: parseInt(tagId),
  };

  // valida se task existe
  const taskExists = tasks.some((t) => t.id === parseInt(taskId));
  if (!taskExists) {
    throw new Error("Task não encontrada");
  }

  // valida se tag existe
  const tagExists = tagService
    .getAllTags()
    .some((t) => t.id === parseInt(tagId));
  if (!tagExists) {
    throw new Error("Tag não encontrada");
  }

  // evita duplicados
  const alreadyLinked = taskTags.some(
    (tt) => tt.taskId === parseInt(taskId) && tt.tagId === parseInt(tagId),
  );
  if (alreadyLinked) {
    throw new Error("Task já possui essa Tag associada");
  }

  taskTags.push(taskTag);
  return taskTag;
};

// Função para atualizar uma Task
export const updateTask = (taskId, data) => {
  const task = tasks.find((t) => t.id === parseInt(taskId));
  if (!task) {
    throw new Error("Task não encontrada");
  }
  task.title = data.title ?? task.title;
  task.completed = data.completed ?? task.completed;
  task.categoria = data.categoria ?? task.categoria;
  task.responsavelNome = data.responsavelNome ?? task.responsavelNome;
  task.dataConclusao = data.dataConclusao ?? task.dataConclusao;
  return task;
};

// Função para deletar uma Task
export const deleteTask = (taskId) => {
  tasks = tasks.filter((t) => t.id !== parseInt(taskId));
};

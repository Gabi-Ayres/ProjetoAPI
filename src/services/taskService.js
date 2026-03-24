import * as tagService from "./tagService.js";
import db from "../db.js";

// // Função para obter todos as tasks com busca e ordenação
export const getAllTasks = async ({ search, sort } = {}) => {
  let query = "SELECT * FROM tasks";
  let params = [];

  if (search) {
    query += " WHERE title LIKE ?";
    params.push(`%${search}%`);
  }

  if (sort === "asc") {
    query += " ORDER BY title ASC";
  } else if (sort === "desc") {
    query += " ORDER BY title DESC";
  }
  const [rows] = await db.query(query, params);
  return rows;
};

export const getTaskById = async (id) => {
  const [rows] = await db.query("SELECT * FROM tasks WHERE id= ?", [id]);
  return rows;
};

// Função para obter estatisticas
export const getTaskStats = async () => {
  const [totalRows] = await db.query(
    "SELECT COUNT(*) AS total FROM tasks"
  );
  const [pendingRows] = await db.query(
    "SELECT COUNT(*) AS pendentes FROM tasks WHERE completed = false"
  );
  const [doneRows] = await db.query(
    "SELECT COUNT(*) AS concluidas FROM tasks WHERE completed = true"
  );
 const total = totalRows[0].total;
 const pendentes = pendingRows[0].pendentes;
 const concluidas = doneRows[0].concluidas;

const taskPorcentagem =
  total === 0 ? 0 : ((concluidas / total) * 100).toFixed(2);  

  return {
    total: total,
    pendentes: pendentes,
    concluida: concluidas,
    porcentagemConcluida: taskPorcentagem + "%",
  };
};


// Função para criar uma Task
export const createTask = async (title, categoria, user_id) => {
  const [result] = await db.query(
    "INSERT INTO tasks (title, categoria, user_id) VALUES (?, ?, ?)",
    [title, categoria, user_id],
  );

  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [
    result.insertId,
  ]);

  return rows[0];
};

// Função para criar uma TaskTag
export const createTaskTag = async (taskId, tagId) => {
  taskId = parseInt(taskId);
  tagId = parseInt(tagId);

  
  const [taskRows] = await db.query(
    "SELECT * FROM tasks WHERE id = ?",
    [taskId]
  );


  if (taskRows.length === 0) {
    throw new Error("Task não encontrada");
  }

  const [tagRows] = await db.query(
    "SELECT * FROM tags WHERE id = ?",
    [tagId]
  );

  if (tagRows.length === 0) {
    throw new Error("Tag não encontrada");
  }

  const [linkRows] = await db.query(
    "SELECT * FROM task_tag WHERE task_id = ? AND tag_id = ?",
    [taskId, tagId]
  );

  if (linkRows.length > 0) {
    throw new Error("Task já possui essa Tag associada");
  }

  await db.query(
    "INSERT INTO task_tag (task_id, tag_id) VALUES (?, ?)",
    [taskId, tagId]
  );

  return {
    taskId,
    tagId
  };
};

// Função para atualizar uma Task
export const updateTask = async (id, data) => {
  // Buscar a task atual
  const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

  if (rows.length === 0) {
    throw new Error("Task não encontrada");
  }

  const task = rows[0]; // é primeira linha

  const title = data.title ?? task.title;
  const categoria = data.categoria ?? task.categoria;
  const completed = data.completed ?? task.completed;
  const dataConclusao = data.dataConclusao ?? task.data_conclusao;
  const user_id = data.user_id ?? task.user_id;


  // Fazer o update
  await db.query(
    `UPDATE tasks SET title = ?, categoria = ?,  completed = ?, data_conclusao = ?,  user_id = ? WHERE id= ?`,
    [title, categoria, completed, dataConclusao,  user_id, id],
  );
 // retornar atualizado
 const [updatedRows] = await db.query(
    "SELECT * FROM tasks WHERE id = ?",
    [id]
 );

 return updatedRows[0]
};

// Função para deletar uma Task
export const deleteTask = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM tasks WHERE id = ?", [id]
  );

  if (rows.length === 0) {
    throw new Error ("Task não encontrada");
  }

  await db.query("DELETE FROM tasks WHERE id = ?", [id]);

  return {messagem: "Task excluída"};
};

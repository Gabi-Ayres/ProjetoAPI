import { getTaskById } from "./taskService.js";
import { getUserById } from "./userService.js";


export const getCommentsByTaskId = async (task_id) => {
  const [rows] = await db.query(
    "SELECT comments FROM comments WHERE tasks.id = ?", [task_id]
  );
  
  return rows;
};

export const createComment = async (taskId, userId, content) => {
  taskId = parseInt(taskId);
  userId = parseInt(userId);

  // Verifica se a task existe
  const [taskRows] = await db.query(
    "SELECT * FROM tasks WHERE id = ?",
    [taskId]
  );

  if (taskRows.length === 0) {
    throw new Error("Task não existe");
  }

  // Verifica se o user existe
  const [userRows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [userId]
  );

  if (userRows.length === 0) {
    throw new Error("User não existe");
  }

  // Cria o comentário
  const [result] = await db.query(
    `INSERT INTO comments (content, user_id, task_id)
     VALUES (?, ?, ?)`,
    [content, userId, taskId]
  );

  // Buscar o comentário criado
  const [rows] = await db.query(
    "SELECT * FROM comments WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};

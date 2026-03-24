import * as taskService from "./taskService.js";
import db from "../db.js";


// Função para obter todas as tags
export const getAllTags = async () => {
  const [rows] = await db.query("SELECT * FROM tags");
  return rows;
};

// Função para obter as tarefas associadas a uma tag específica
export const getTasksByTagId = async (id) => {
  const [rows] = await db.query(
    `SELECT tasks.title, tags.name 
    FROM task_tag
    JOIN tasks ON task_tag.task_id = tasks.id
    JOIN tags ON task_tag.tag_id = tags.id
    WHERE task_tag.tag_id = ?`,
    [id]

  );

  return rows;
}


// Função para criar uma nova tag
export const createTag = async (name) => {
  const [result] = await db.query(
    "INSERT INTO tags (name) VALUES (?)",
    [name]
  );

  const [rows] = await db.query(
    "SELECT * FROM tags WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};

// Função para remover todas as associacões da tag e depois remover ela
export const deleteTag = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM tags WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    throw new Error("Tag não encontrada");
  }

  await db.query("DELETE FROM tags WHERE id = ?", [id]);

  return { mensagem: "Tag excluída" };
};

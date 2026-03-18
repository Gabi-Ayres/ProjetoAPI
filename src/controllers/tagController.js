import * as tagService from "../services/tagService.js";

// Função q recebe o pedido para mostrar as Tags e retornar a resposta
export const getAllTags = (req, res) => {
  const tags = tagService.getAllTags();
  res.json(tags);
};

// Função q recebe o pedido para mostrar TaskTag e retornar a resposta
export const getTaskByTagId = (req, res) => {
  const tagId = req.params.id;
  const tasks = tagService.getTasksByTagId(tagId);
  res.json(tasks);
};

// Função q recebe o pedido para criação de Tag e retornar a resposta
export const createTag = (req, res) => {
  const newTag = tagService.createTag(req.body);
  res.status(201).json(newTag);
};

// Função q recebe o pedido para criação de Tasks e retornar a resposta
export const deleteTag = (req, res) => {
  tagService.deleteTag(req.params.id);
  res.json({ mensagem: "Tag exluída" });
};

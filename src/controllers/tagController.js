import * as tagService from "../services/tagService.js";

// Função q recebe o pedido para mostrar as Tags e retornar a resposta
export const getTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Função q recebe o pedido para mostrar TaskTag e retornar a resposta
export const getTasksByTag = async (req, res) => {
  try {
    const tasks = await tagService.getTasksByTagId(req.params.id);
    res.json(tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Função q recebe o pedido para criação de Tag e retornar a resposta
export const createTag = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name === "") {
      return res.status(400).json({ error: "Nome da tag é obrigatório" });
    }

    const tag = await tagService.createTag(name);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const deleteTag = async (req, res) => {
  try {
    const result = await tagService.deleteTag(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
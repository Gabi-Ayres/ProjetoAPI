import * as commentService from "../services/commentService.js";

export const createCommentForTask = (req, res) => {
  const taskId = req.params.id;
  const { userId, conteudo } = req.body;

  const comment = commentService.createComment(taskId, userId, conteudo);

  res.status(201).json(comment);
};

export const getCommentsForTask = (req, res) => {
  const taskId = req.params.id;

  const comments = commentService.getCommentsByTaskId(taskId);

  res.json(comments);
};
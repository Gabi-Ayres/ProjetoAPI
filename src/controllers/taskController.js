import * as taskService from "../services/taskService.js";
import {
  createComment,
  getCommentsByTaskId,
} from "../services/commentService.js";

// // Função q recebe o pedido de busca de tasks e retornar a resposta
export const getTasks = async(req, res) => {
 try {
  const { search, sort } = req.query;
  const tasks = await taskService.getAllTasks({search, sort});
  res.json(tasks);
 } catch (error) {
  console.error(error);
  res.status(500).json({error: "Task não existe"})
 }
};

export const getTaskId = async (req, res) => {
 try{ const task = await taskService.getTaskById(req.params.id);
  res.json(task);
 } catch(error) {
  res.status(404).json({error: error.message})

 }
};

// Função q recebe o pedido de estatistica das tasks e retornar a resposta
export const getTaskStats = async (req, res) => {
  try {
  const stats = await taskService.getTaskStats();
  res.json(stats);
  }catch (error) {
    res.status(500).json({error: error.message});
  }
};

// Função q recebe o pedido para criação de Tasks e retornar a resposta
export const createTask = async (req, res) => {
  try{
  const { title, categoria, user_id } = req.body;

  if (title.length < 4) {
    return res
      .status(400)
      .json({ error: "Título tem que ter pelo menos 4 caracters" });
  }
  if (user_id === undefined || user_id === null) {
    return res
      .status(400)
      .json({ erro: "user_id não pode estar vazio" });
  }

  const task = await taskService.createTask (title, categoria, user_id);

  res.status(201).json(task);
} catch (error) {
  res.status(400).json({error: error.mensage});
}  
};


// Função q recebe o pedido para criação de TaskTag e retornar a resposta
export const createTaskTag = async (req, res) => {
  try {
    const relation = await taskService.createTaskTag(
      req.params.id,
      req.body.tagId
    );

    res.status(201).json(relation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função q recebe o pedido para atualização de Tasks e retornar a resposta
export const updateTask = async (req, res) => {
  try {
    const data = req.body;

    if (data.completed === true) {
      data.dataConclusao = new Date();
    } else if (data.completed === false) {
      data.dataConclusao = null;
    }

    const task = await taskService.updateTask(req.params.id, data);
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Função q recebe o pedido para deletar uma Tasks e retornar a resposta
export const deleteTask = async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getCommentsForTask = async (req, res) => {
  try {
  const comments = await getCommentsByTaskId(req.params.id);

  res.status(200).json(comments);
} catch (error){
  res.status(400).json({error: error.message})
}
};

export const createdComment = async (req, res) => {
  try {
    const { userId, content } = req.body;

    if (!content || content === "") {
      return res.status(400).json({ error: "Conteúdo é obrigatório" });
    }

    const comment = await createComment(
      req.params.id,
      userId,
      content
    );

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

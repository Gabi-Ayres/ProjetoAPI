import * as taskService from "../services/taskService.js";
import  {createComment, getCommentsByTaskId} from "../services/commentService.js";


// // Função q recebe o pedido de busca de tasks e retornar a resposta
export const getTasks = (req, res) => {
  const { search, sort } = req.query;
  const tasks = taskService.getAllTasks(search, sort);
  res.json(tasks);
};

// Função q recebe o pedido de estatistica das tasks e retornar a resposta
export const getTaskStats = (req, res) => {
  const stats = taskService.getAllTasks();
  res.json(stats);
};


// Função q recebe o pedido para criação de Tasks e retornar a resposta
export const createTask = (req, res) => {
  const { title, responsavelNome } = req.body;

  if (title.length < 4) {
    return res
      .status(400)
      .json({ error: "Título tem que ter pelo menos 4 caracters"});
  }
  if (responsavelNome === undefined || responsavelNome === null) {
    return res
      .status(400)
      .json({ erro: "ResponsavelNome não pode estar vazio" });
  }

  const task = taskService.createTask(req.body);

  res.status(201).json(task);
};

// Função q recebe o pedido para criação de TaskTag e retornar a resposta
export const createTaskTag = (req, res) => {
  try {
    const taskId = req.params.id;
    const tagId = req.body.tagId;

    if (!tagId) {
      return res.status(400).json({ error: "tagId é obrigatório" });
    }

    const relation = taskService.createTaskTag(taskId, tagId);
    res.status(201).json(relation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função q recebe o pedido para atualização de Tasks e retornar a resposta
export const updateTask = (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (data.completed === true) {
      data.dataConclusao = new Date();
    } else if (data.completed === false) {
      data.dataConclusao = null;
    }

    const task = taskService.updateTask(id, data);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Função q recebe o pedido para deletar uma Tasks e retornar a resposta
export const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);

    const tasks = taskService.getAllTasks();
    const taskPendentes = tasks.filter((t) => t.completed === false);
    const taskConcluidas = tasks.filter((t) => t.completed === true);

    res.json({
      mensagem: "Task excluída",
      total: tasks.length,
      pendentes: taskPendentes.length,
      concluida: taskConcluidas.length,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCommentsForTask = (req, res) => {
  const taskId = req.params.id;

  const comments = getCommentsByTaskId(taskId);

  res.status(200).json(comments);
};

export const createTaskComment= (req, res) => {
  const taskId = req.params.id;
  const { userId, content } = req.body;
  
  const result = createComment(taskId, userId, content);
   res.status(200).json(result);
}



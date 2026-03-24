import * as userService from "../services/userService.js";

// Funçao q recebe o pedido de usuários e retornar a resposta
export const getUsers = async (req, res) => {
  try {
  const { search, sort } = req.query;
  const users = await userService.getAllUsers(search, sort);
  res.json(users);
} catch(error){
  res.status(400).json({error: "User não existe"});
}
};

// Funçao q recebe o pedido de criar usuário e retornar a resposta
export const createUser = async (req, res) => {
  try {
  const { name, email, active } = req.body;

  if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

  if (email !== undefined && !email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }

  if (active !== undefined && typeof active !== "boolean") {
      return res.status(400).json({ error: "Ativo deve ser boolean" });
    }

  const newUser = await userService.createUser(name, email, active);
  res.status(201).json(newUser);
  }catch(error) {
    res.status(400).json({error: error.message});
  }
};


export const updateUser = async (req, res) => {
  try {
    const data = req.body;

    if (data.email !== undefined && !data.email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }

    if (data.active !== undefined && typeof data.active !== "boolean") {
      return res.status(400).json({ error: "Ativo deve ser boolean" });
    }

    const user = await userService.updateUser(req.params.id, data);

    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Funçao q recebe o pedido de deletar usuário e retornar a resposta
export const deleteUser = async(req, res) => {
  try {
  const result = await userService.deleteUser(req.params.id);
  res.json(result);
} catch {
  res.status(404).json({error: error.message})
}
};


import * as userService from "../services/userService.js";

// Funçao q recebe o pedido de usuários e retornar a resposta 
export const getUsers= (req, res) => {
   const {search, sort} = req.query;
   
   const users = userService.getAllUsers(search, sort);
    res.json(users);
}

// Funçao q recebe o pedido de criar usuário e retornar a resposta
export const createUser = (req, res) => {
  const { name, email, active } = req.body;

  if (email !== undefined) {
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }
  }

  if (active !== undefined) {
    if (typeof active !== "boolean") {
      return res.status(400).json({ error: "Ativo deve ser boolean" });
    }
  }
    const newUser = userService.createUser(req.body);
    res.status(201).json(newUser);
}

export const updateUser = (req, res) => {
    const user = userService.updateUser(req.params.id, req.body)
    res.json(user);
}

// Funçao q recebe o pedido de deletar usuário e retornar a resposta
export const deleteUser = (req, res) => {
    userService.deleteUser(req.params.id)
    res.json({mensagem: "Usuário excluído"});
}
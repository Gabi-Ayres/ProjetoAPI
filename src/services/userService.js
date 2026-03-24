import db from "../db.js";


// Função para obter todos os usarios com busca e ordenação
export const getAllUsers = async (search, sort) => {
 let query = "SELECT * FROM users";
 
 let params = []

  if (search) {
   query += " WHERE name LIKE ?";
   params.push(`%${search}%`);
  }

  if (sort === "asc") {
   query += " ORDER BY name ASC";
  } else if (sort === "desc") {
    query += " ORDER BY name DESC";
  }

  const [rows] =  await db.query(query, params);
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?", [id]
  );

  if (rows.length === 0)
    throw new Error ("User não encontrado");

  return rows[0];
} 

//Frunção para criar um novo usuário
export const createUser = async (name, email, active) => {
  let result;

  if (active === undefined) {
    [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );
  } else {
    [result] = await db.query(
      "INSERT INTO users (name, email, active) VALUES (?, ?, ?)",
      [name, email, active]
    );
  }

  const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [result.insertId]
  );

  return rows[0];
};

// Função para atualizar um usuário
export const updateUser = async (id, data) => {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  const user = rows[0];

  const name = data.name ?? user.name;
  const email = data.email ?? user.email;
  const active = data.active ?? user.active;

  await db.query(
    `UPDATE users 
     SET name = ?, email = ?, active = ? 
     WHERE id = ?`,
    [name, email, active, id]
  );

  const [updatedRows] = await db.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );

  return updatedRows[0];
};

// Função para deletar um usuário
export const deleteUser = async(id) => {
   const [rows] = await db.query(
    "SELECT * FROM users WHERE id = ?", [id]
  );

  if (rows.length === 0) {
    throw new Error ("User não encontrado");
  }

  await db.query("DELETE FROM users WHERE id = ?", [id]);

  return {message: "User excluído"};
};
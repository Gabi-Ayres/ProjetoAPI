
import { users } from "../services/userService.js";


export const checkUserExists = (req, res, next) => {
const userId = req.params.id;

const user = users.find(u => u.id === parseInt(userId));

if (!user) 
    return res.status(404).json({ error: "Utilizador não encontrado" });


next();

};
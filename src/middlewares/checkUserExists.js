import {getUserById} from "../services/userService.js";

export const checkUserExists = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    req.user = user;

    next();
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
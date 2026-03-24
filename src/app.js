import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import tagsRoutes from "./routes/tagsRoutes.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/tasks", taskRoutes);
app.use("/users", usersRoutes);
app.use("/tags", tagsRoutes);


const PORT= process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});



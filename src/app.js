import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import tagsRoutes from "./routes/tagsRoutes.js";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/tasks", taskRoutes);
app.use("/users", usersRoutes);
app.use("/tags", tagsRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});



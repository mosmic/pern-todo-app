import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import {
  getTodosByUserId,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../db/todoQueries";

const router = Router();

router.use(authMiddleware); // applies to ALL routes in this file

router.get("/", async (req, res, next) => {
  const userId = req.user!.userId;
  try {
    const todos = await getTodosByUserId(userId);
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.user!.userId;
  try {
    const newTodo = await createTodo(userId, title, description);
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const userId = req.user!.userId;
  const { title, description, status } = req.body;
  try {
    const todoId = parseInt(req.params.id, 10);
    const updatedTodo = await updateTodo(
      todoId,
      userId,
      title,
      description,
      status,
    );
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  const userId = req.user!.userId;
  const todoId = parseInt(req.params.id, 10);
  try {
    await deleteTodo(todoId, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;

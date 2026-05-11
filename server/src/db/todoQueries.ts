import { Todo, TodoStatus } from "../types";
import pool from "./pool";

export async function createTodo(
  userId: number,
  title: string,
  description: string,
): Promise<Todo> {
  const query = `INSERT INTO todos (user_id, title, description)
                 VALUES ($1, $2, $3)
                 RETURNING *`;
  const values = [userId, title, description];
  const result = await pool.query(query, values);
  return result.rows[0] as Todo;
}

export async function updateTodo(
  todoId: number,
  userId: number,
  title: string,
  description: string,
  status: TodoStatus,
): Promise<Todo> {
  const query = `UPDATE todos SET title = $3, description = $4, status = $5
                 WHERE id = $1 AND user_id = $2
                 RETURNING *`;
  const values = [todoId, userId, title, description, status];
  const result = await pool.query(query, values);
  return result.rows[0] as Todo;
}

export async function getTodosByUserId(userId: number): Promise<Todo[]> {
  const query = `SELECT * FROM todos WHERE user_id = $1`;
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows as Todo[];
}

export async function deleteTodo(id: number, userId: number): Promise<void> {
  const query = `DELETE FROM todos WHERE id = $1 AND user_id = $2`;
  const values = [id, userId];
  await pool.query(query, values);
}

// import { Client } from "pg";
import { User } from "../types";
import pool from "./pool";

// async function createUser(username: string, email: string, passwordHash: string) {
//   const client = new Client({
//     host: "localhost",
//     database: "todo_app",
//     user: "postgres",
//     password: "password",
//   });

//   await client.connect();   // open a new connection every time
//   const result = await client.query(
//     `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *`,
//     [username, email, passwordHash]
//   );
//   await client.end();       // manually close it every time
//   return result.rows[0];
// }

async function createUser(
  username: string,
  email: string,
  passwordHash: string,
): Promise<User> {
  // Your implementation here
  const query = `INSERT INTO users (username, email, password_hash)
                 VALUES ($1, $2, $3)
                 RETURNING id, username, email`;
  const values = [username, email, passwordHash];
  const result = await pool.query(query, values);
  return result.rows[0] as User;
}

async function findUserByEmail(email: string): Promise<User | null> {
  const query = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
}

async function findUserById(id: number): Promise<User | null> {
  const query = `SELECT * FROM users WHERE id = $1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
}

export { createUser, findUserByEmail, findUserById };

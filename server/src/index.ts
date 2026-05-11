import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import todosRoutes from "./routes/todos";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todosRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

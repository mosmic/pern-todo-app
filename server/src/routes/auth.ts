import { Router } from "express";
import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../db/userQueries";
import jwt from "jsonwebtoken";

const router = Router();

// POST /auth/register
router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);
    res
      .status(201)
      .json({ id: user.id, username: user.username, email: user.email });
  } catch (error) {
    next(error);
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    const errorMessage = "Invalid email or password";

    if (!user) {
      return res.status(401).json({ error: errorMessage });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: errorMessage });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;

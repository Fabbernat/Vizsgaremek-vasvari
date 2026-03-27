import express from "express";
import * as Users from "../data/userData.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/users", (req, res) => {
  const users = Users.getUsers();
  res.json(users);
});

router.get("/users/:id", (req, res) => {
  const user = Users.getUserById(+req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  res.json({ status: "success", code: 200, data: user });
});

router.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing data!" });
  }

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  const saved = Users.createUser(username, email, hashedPassword);
  const user = Users.getUserById(saved.lastInsertRowid);
  res
    .status(201)
    .json({ message: "User created!", id: saved.lastInsertRowid, user });
});

router.put("/users/:id", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing data!" });
  }
  const id = req.params.id;
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  Users.updateUser(id, username, email, hashedPassword);
  const user = Users.getUserById(id);
  res.status(200).json({ message: "User update success", user });
});

router.patch("/users/:id", (req, res) => {
  const { username, email, password } = req.body;
  const id = req.params.id;
  let user = Users.getUserById(id);
  let hashedPassword;
  if (password) {
    const salt = bcrypt.genSaltSync();
    hashedPassword = bcrypt.hashSync(password, salt);
  }
  Users.updateUser(
    id,
    username || user.username,
    email || user.email,
    hashedPassword || user.password,
  );
  user = Users.getUserById(id);
  res.status(200).json({ message: "User successfuly updated!", user });
});

router.delete("/users/:id", (req, res) => {
  const user = Users.getUserById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found!" });
  }
  Users.deleteUser(req.params.id);
  res.status(200).json({ message: "User deleted!" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  const user = Users.getUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "VERY_SECRET_KEY_FOR_THE_TOKENS",
    { expiresIn: "30m" },
  );

  res.json({
    token,
    user_id: user.id,
    username: user.username,
  });
});

export default router;

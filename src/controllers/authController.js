import usersRepository from "../repository/authRepository.js";
import sessionRepository from "../repository/sessionsRepository.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const existingUsers = usersRepository.getUserByEmail(email);

    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    await usersRepository.createUser(name, email, password);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const { rows: users } = await usersRepository.getUserByEmail(email);
  const [user] = users;

  if (!user) {
    return res.sendStatus(401);
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await sessionRepository.createSession(token, user.id);
    return res.send(token);
  }

  res.sendStatus(401);
}

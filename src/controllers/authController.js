import bcrypt from "bcrypt";
import db from "../db/database";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const passwordEncrypted = bcrypt.hashSync(password, 10);
    await db.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
      [name, email, passwordEncrypted]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

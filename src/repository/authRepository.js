import bcrypt from "bcrypt";
import db from "../db/database.js";

async function createUser(name, email, password) {
  const passwordEncrypted = bcrypt.hashSync(password, 10);

  await db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, passwordEncrypted]
  );
}

async function getUserByEmail(email) {
  await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
}

async function getUserById(id) {
  await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
}

const usersRepository = {
  createUser,
  getUserByEmail,
  getUserById,
};

export default usersRepository;

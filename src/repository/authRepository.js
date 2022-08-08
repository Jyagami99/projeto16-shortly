import bcrypt from "bcrypt";
import db from "../db/database";

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

const usersRepository = {
  createUser,
  getUserByEmail,
};

export default usersRepository;

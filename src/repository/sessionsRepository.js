import db from "../db/database.js";

async function createSession(token, userId) {
  await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [
    token,
    userId,
  ]);
}

async function getSessionByToken(token) {
  await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
}

const sessionRepository = {
  createSession,
  getSessionByToken,
};

export default sessionRepository;

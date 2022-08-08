import db from "../db/database";

async function createSession(token, userId) {
  await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [
    token,
    userId,
  ]);
}

const sessionRepository = {
  createSession,
};

export default sessionRepository;

import usersRepository from "../repositories/authRepository.js";
import sessionRepository from "../repositories/sessionsRepository.js";

export default async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();

  if (!token) {
    return res.status(401).send("foi no token");
  }

  try {
    const { rows: sessions } = await sessionRepository.getSessionByToken(token);
    const [session] = sessions;

    if (!session) {
      return res.status(401).send("foi no sessions");
    }

    const { rows: users } = await usersRepository.getUserById(session.userId);
    const [user] = users;

    if (!user) {
      return res.status(401).send("foi no users");
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

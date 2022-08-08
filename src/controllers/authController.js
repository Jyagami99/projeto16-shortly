import usersRepository from "../repository/authRepository";

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
  // const {rows: users = await usersRepository.getUserByEmail(email)}
}

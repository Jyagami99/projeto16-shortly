import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlsRouter.js";
import rankRouter from "./routes/ranksRouter.js";

async function main() {
  dotenv.config();

  const server = express();
  server.use(cors());
  server.use(json());

  server.use(authRouter);
  server.use(urlRouter);
  server.use(rankRouter);

  const PORT = process.env.PORT || 3333;
  server.listen(PORT, () => {
    console.log(`O servidor suviu na porta ${PORT}`);
  });
}

main().catch(console.error);

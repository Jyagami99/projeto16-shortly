import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

async function main() {
  dotenv.config();

  const server = express();
  server.use(cors());
  server.use(json());

  const PORT = process.env.PORT || 3333;
  server.listen(PORT, () => {
    console.log(`O servidor suviu na porta ${PORT}`);
  });
}

main().catch(console.error);

import { Router } from "express";
import { getRanking } from "../controllers/rankingController.js";
import { getUserById } from "../controllers/usersController.js";
import validateToken from "../middlewares/tokenMiddleware.js";

const rankRouter = Router();

rankRouter.get("/users/:id", validateToken, getUserById);
rankRouter.get("/ranking", getRanking);

export default rankRouter;

import { Router } from "express";
import { signUp } from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import userSchema from "../schemas/userSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), signUp);
authRouter.post("/signin");

export default authRouter;

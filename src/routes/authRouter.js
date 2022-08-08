import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import signInSchema from "../schemas/signInSchema.js";
import signUpSchema from "../schemas/signUpSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin", validateSchema(signInSchema), signIn);

export default authRouter;

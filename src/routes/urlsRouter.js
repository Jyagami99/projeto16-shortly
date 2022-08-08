import { Router } from "express";
import { shortenUrl } from "../controllers/urlsController.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  validateToken,
  shortenUrl
);
urlRouter.get("/urls/:id");
urlRouter.get("/urls/open/:shortUrl");
urlRouter.delete("/urls/:id");

export default urlRouter;

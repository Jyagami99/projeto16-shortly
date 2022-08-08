import { Router } from "express";
import {
  getUrlById,
  openShortUrl,
  shortenUrl,
} from "../controllers/urlsController.js";
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
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", openShortUrl);
urlRouter.delete("/urls/:id", validateToken);

export default urlRouter;

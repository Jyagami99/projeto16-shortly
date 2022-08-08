import { Router } from "express";
import {
  getUrlById,
  getShortUrl,
  createShortUrl,
  deleteUrl,
} from "../controllers/urlsController.js";
import validateSchema from "../middlewares/schemaMiddleware.js";
import validateToken from "../middlewares/tokenMiddleware.js";
import urlSchema from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  validateToken,
  createShortUrl
);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get("/urls/open/:shortUrl", getShortUrl);
urlRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlRouter;

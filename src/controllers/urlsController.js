import { nanoid } from "nanoid";
import urlsRepository from "../repository/urlsRepository.js";

export async function shortenUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await urlsRepository.createShortUrl(url, shortUrl, id);

    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

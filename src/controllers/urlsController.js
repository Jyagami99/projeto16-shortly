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

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const result = await urlsRepository.getURLById(id);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    const [url] = result.rows;

    delete url.visitCount;
    delete url.userId;

    res.send(url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const result = await urlsRepository.getByShortUrl(shortUrl);
    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }
    const [url] = result.rows;
    await urlsRepository.incrementURLVisitCount(url.id);
    res.redirect(url.url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

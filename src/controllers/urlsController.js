import { nanoid } from "nanoid";
import urlsRepository from "../repositories/urlsRepository.js";

export async function createShortUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;
  const shortUrl = nanoid(8);

  try {
    await urlsRepository.shortenUrl(url, shortUrl, id);

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

export async function getShortUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const result = await urlsRepository.getByShortUrl(shortUrl);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [url] = result.rows;

    await urlsRepository.incrementUrlVisitCount(url.id);
    res.redirect(url.url);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const result = await urlsRepository.getURLById(id);

    if (result.rowCount === 0) {
      return res.sendStatus(404);
    }

    const [url] = result.rows;

    if (url.userId !== user.id) {
      return res.sendStatus(401);
    }

    await urlsRepository.deleteUrl(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

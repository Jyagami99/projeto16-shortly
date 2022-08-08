import db from "../db/database.js";

async function createShortUrl(url, shortUrl, id) {
  await db.query(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, id]
  );
}

const urlsRepository = { createShortUrl };

export default urlsRepository;

import db from "../db/database.js";

async function createShortUrl(url, shortUrl, id) {
  await db.query(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, id]
  );
}

async function getURLById(id) {
  await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

async function getByShortUrl(shortUrl) {
  await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}

const urlsRepository = { createShortUrl, getURLById, getByShortUrl };

export default urlsRepository;

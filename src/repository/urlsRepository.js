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

const urlsRepository = { createShortUrl, getURLById };

export default urlsRepository;

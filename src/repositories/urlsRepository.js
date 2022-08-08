import db from "../db/database.js";

async function shortenUrl(url, shortUrl, id) {
  await db.query(
    `INSERT INTO urls (url, "shortUrl", "userId") VALUES ($1, $2, $3)`,
    [url, shortUrl, id]
  );
}

async function getURLById(id) {
  return db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

async function getByShortUrl(shortUrl) {
  return db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}

async function deleteUrl(id) {
  return db.query(`DELETE FROM urls WHERE id = $1`, [id]);
}

async function incrementUrlVisitCount(urlId) {
  await db.query(
    `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE id = $1`,
    [urlId]
  );
}

async function getVisitCountByUser(userId) {
  return db.query(
    `SELECT SUM(urls."visitCount") FROM urls WHERE urls."userId" = $1`,
    [userId]
  );
}

async function getUrlsByUser(userId) {
  return db.query(`SELECT * FROM urls WHERE urls."userId" = $1`, [userId]);
}

async function getUrlsRankingByUser() {
  return db.query(
    `SELECT users.id, users.name, COUNT(urls.id) as "linkCount", SUM(urls."visitCount") as "visitCount" FROM urls JOIN users ON urls."userId" = users.id GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`
  );
}

const urlsRepository = {
  shortenUrl,
  getURLById,
  getByShortUrl,
  deleteUrl,
  incrementUrlVisitCount,
  getVisitCountByUser,
  getUrlsByUser,
  getUrlsRankingByUser,
};

export default urlsRepository;

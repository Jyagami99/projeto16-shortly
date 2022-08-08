import urlsRepository from "../repositories/urlsRepository.js";

export async function getRanking(req, res) {
  try {
    const result = await urlsRepository.getUrlsRankingByUser();

    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

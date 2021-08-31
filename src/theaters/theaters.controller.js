const service = require("./theaters.service");

async function getTheatersByMovie(req, res) {
  const results = await service.getTheatersByMovie();
  res.json({ data: results });
}

module.exports = {
  getTheatersByMovie,
};

const MoviesServices = require("./movies.service");

async function list(req, res) {
  const { is_showing = false } = req.query;
  res.json({ data: await MoviesServices.list(Boolean(is_showing)) });
}

async function getMovieById(req, res) {
  const data = await MoviesServices.getMovieById(req.params.movieId);
  res.json({ data });
}

async function validateMovieId(req, res, next) {
  const { movieId } = req.params;
  const movie = await MoviesServices.getMovieById(Number(movieId));

  if (movie) {
    res.locals.movie = movie;
    return next();
  }

  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

async function getTheatersWhereMovieIsPlaying(req, res, next) {
  const { movieId } = req.params;

  const foundTheaters = await MoviesServices.getTheatersWhereMovieIsPlaying(
    movieId
  );

  if (!foundTheaters) {
    return next({
      status: 404,
      message: `Movie not found. Incorrect id: ${movieId}`,
    });
  }
  res.json({ data: foundTheaters });
}

async function getReviewsForMovie(req, res, next) {
  const { movieId } = req.params;

  const foundReviews = await MoviesServices.getReviewsForMovie(movieId);

  if (!foundReviews) {
    return next({
      status: 404,
      message: `Movie not found. Incorrect id: ${movieId}`,
    });
  }
  res.json({ data: foundReviews });
}

module.exports = {
  list,
  getMovieById: [validateMovieId, getMovieById],
  validateMovieId,
  getTheatersWhereMovieIsPlaying,
  getReviewsForMovie,
};

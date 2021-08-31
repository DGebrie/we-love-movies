const knex = require("../db/connection");

const MoviesServices = {
  list(isShowing) {
    if (isShowing) {
      return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("mt.movie_id")
        .select("m.*")
        .where({ is_showing: true });
    }

    return knex("movies").select("*");
  },

  getMovieById(movieId) {
    return knex("movies").select("*").where("movie_id", movieId).first();
  },

  getTheatersWhereMovieIsPlaying(movieId) {
    return knex("theaters as t")
      .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
      .where("mt.movie_id", movieId);
  },

  getReviewsForMovie(movieId) {
    return knex("reviews")
      .select("reviews.*", "critics.*")
      .join("critics", "reviews.critic_id", "critics.critic_id")
      .where("reviews.movie_id", movieId)
      .then((results) =>
        results.map((item) => {
          item.critic = {
            critic_id: item.critic_id,
            preferred_name: item.preferred_name,
            surname: item.surname,
            organization_name: item.organization_name,
          };
          return item;
        })
      );
  },
};

module.exports = MoviesServices;

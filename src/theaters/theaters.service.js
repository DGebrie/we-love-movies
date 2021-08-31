const { select } = require("../db/connection");
const db = require("../db/connection");

const reduceProperties = require("../utils/reduce-properties");

const ReviewsService = {
  async getTheatersByMovie() {
    return db("theaters")
      .select("*")
      .join(
        "movies_theaters",
        "movies_theaters.theater_id",
        "theaters.theater_id"
      )
      .join("movies", "movies.movie_id", "movies_theaters.movie_id")
      .then((response) => {
        const reduceMovies = reduceProperties("theater_id", {
          movie_id: ["movies", null, "movie_id"],
          title: ["movies", null, "title"],
          runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
          rating: ["movies", null, "rating"],
          description: ["movies", null, "description"],
          image_url: ["movies", null, "image_url"],
          is_showing: ["movies", null, "is_showing"],
        });
        response = reduceMovies(response);
        return response;
      });
  },
};

module.exports = ReviewsService;

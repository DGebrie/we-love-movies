const router = require("express").Router();
const controller = require("./movies.controller");
// const theatersRouter = require("../theaters/theaters.router");
const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router.use("/:movieId/theaters", controller.validateMovieId, theatersRouter);
// router.use("/:movieId/reviews", controller.validateMovieId, reviewsRouter);

router.route("/").get(controller.list).all(methodNotAllowed);

router.route("/:movieId").get(controller.getMovieById).all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(controller.getTheatersWhereMovieIsPlaying)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.getReviewsForMovie)
  .all(methodNotAllowed);

module.exports = router;

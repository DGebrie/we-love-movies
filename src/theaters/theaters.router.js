const router = require("express").Router();
const controller = require("./theaters.controller");
// const theatersRouter = require("../theaters/theaters.router");
// const reviewsRouter = require("../reviews/reviews.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router.use("/:movieId/theaters", controller.validateMovieId, theatersRouter);
// router.use("/:movieId/reviews", controller.validateMovieId, reviewsRouter);

router.route("/").get(controller.getTheatersByMovie).all(methodNotAllowed);

module.exports = router;

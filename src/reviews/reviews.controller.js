const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const ReviewsService = require("./reviews.service");

async function checkIfIdExists(req, res, next) {
  const { reviewId } = req.params;

  const foundReview = await ReviewsService.getReviewById(reviewId);

  if (foundReview.length === 0) {
    return res.status(404).send({ error: "Review cannot be found" });
  }

  next();
}

async function checkIfBodyExists(req, res, next) {
  const body = req.body.data;

  if (!body) {
    return res.status(404).send({ error: "Review cannot be found" });
  }

  next();
}

async function updateReviewById(req, res, next) {
  const { reviewId } = req.params;
  const body = req.body.data;

  const updatedReview = await ReviewsService.updateReviews(reviewId, body);
  res.json({ data: updatedReview });
}

async function deleteReview(req, res) {
  const { reviewId } = req.params;

  await ReviewsService.deleteReviews(reviewId);
  res.sendStatus(204);
}

module.exports = {
  update: [
    asyncErrorBoundary(checkIfIdExists),
    asyncErrorBoundary(checkIfBodyExists),
    updateReviewById,
  ],
  delete: [asyncErrorBoundary(checkIfIdExists), deleteReview],
};

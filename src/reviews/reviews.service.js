const { select } = require("../db/connection");
const knex = require("../db/connection");

const ReviewsService = {
  async getReviewById(id) {
    return knex("reviews").select("*").where("reviews.review_id", id);
  },

  updateReviews(id, body) {
    return knex("reviews")
      .update(body)
      .where("reviews.review_id", id)
      .then((review) => {
        return knex("reviews")
          .select("*")
          .join("critics", "critics.critic_id", "reviews.critic_id")
          .where("reviews.review_id", id)
          .first();
      })
      .then((item) => {
        item.critic = {
          critic_id: item.critic_id,
          preferred_name: item.preferred_name,
          surname: item.surname,
          organization_name: item.organization_name,
        };
        return item;
      });
  },
  async deleteReviews(id) {
    return knex("reviews").where("reviews.review_id", id).del();
  },
};

module.exports = ReviewsService;

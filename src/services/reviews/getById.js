const createError = require("http-errors");

module.exports = async (data, db) => {
  const { Review } = db.models;
  try {
    let review = await Review.findByPk(data.id);
    if (!review) {
      throw new createError(404, "Review not found");
    }
    return review;
  } catch (error) {
    throw error;
  }
};

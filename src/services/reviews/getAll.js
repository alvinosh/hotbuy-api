module.exports = async (data, db) => {
  const { Review } = db.models;

  try {
    return await Review.findAll();
  } catch (error) {
    throw error;
  }
};

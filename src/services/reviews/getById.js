module.exports = async (data, db) => {
  const { Review } = db.models;
  try {
    return await Review.findByPk(data.id);
  } catch (error) {
    throw error;
  }
};

module.exports = async (data, db) => {
  const { Review } = db.models;

  try {
    return await Review.create(data);
  } catch (error) {
    return error;
  }
};

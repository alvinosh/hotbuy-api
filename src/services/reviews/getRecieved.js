module.exports = async (data, db) => {
  const { Review } = db.models;

  try {
    return await Review.findAll({
      where: {
        recieverId: data.id
      }
    });
  } catch (error) {
    throw error;
  }
};

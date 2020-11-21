module.exports = async (data, db) => {
  const { Review } = db.models;
  try {
    return await Review.destroy({
      where: {
        id: data.id
      }
    });
  } catch (error) {
    throw error;
  }
};

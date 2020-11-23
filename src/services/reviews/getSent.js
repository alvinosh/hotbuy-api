module.exports = async (data, db) => {
  const { Review } = db.models;

  try {
    return await Review.findAll({
      where: {
        senderId: data.id
      }
    });
  } catch (error) {
    throw error;
  }
};

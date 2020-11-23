module.exports = async (data, db) => {
  const { Review } = db.models;

  try {
    return await Review.create({
      comment: data.comment,
      recieverId: data.reciever,
      senderId: data.token.id
    });
  } catch (error) {
    throw error;
  }
};

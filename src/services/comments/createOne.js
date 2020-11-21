module.exports = async (data, db) => {
  const { Comment } = db.models;

  try {
    return await Comment.create(data);
  } catch (error) {
    return error;
  }
};

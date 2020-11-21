module.exports = async (data, db) => {
  const { Comment } = db.models;

  try {
    return await Comment.findAll();
  } catch (error) {
    return error;
  }
};

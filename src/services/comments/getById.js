module.exports = async (data, db) => {
  const { Comment } = db.models;
  try {
    return await Comment.findByPk(data.id);
  } catch (error) {
    return error;
  }
};

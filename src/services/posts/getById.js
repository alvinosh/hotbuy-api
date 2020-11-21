module.exports = async (data, db) => {
  const { Post } = db.models;
  try {
    return await Post.findByPk(data.id);
  } catch (error) {
    return error;
  }
};

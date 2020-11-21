module.exports = async (data, db) => {
  const { Post } = db.models;

  try {
    return await Post.findAll();
  } catch (error) {
    return error;
  }
};

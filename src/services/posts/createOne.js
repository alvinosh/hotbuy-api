module.exports = async (data, db) => {
  const { Post } = db.models;

  try {
    return await Post.create(data);
  } catch (error) {
    return error;
  }
};

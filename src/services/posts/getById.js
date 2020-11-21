module.exports = async (data, db) => {
  const { Post, Comment } = db.models;
  try {
    return await Post.findByPk(data.id, {
      include: Comment
    });
  } catch (error) {
    return error;
  }
};

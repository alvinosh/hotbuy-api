module.exports = async (data, db) => {
  const { Post, Comment } = db.models;

  try {
    return await Post.findAll({
      include: Comment
    });
  } catch (error) {
    throw error;
  }
};

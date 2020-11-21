module.exports = async (data, db) => {
  const { Post } = db.models;
  try {
    return await Post.destroy({
      where: {
        id: data.id
      }
    });
  } catch (error) {
    throw error;
  }
};

module.exports = async (data, db) => {
  const { Comment } = db.models;
  try {
    return await Comment.destroy({
      where: {
        id: data.id
      }
    });
  } catch (error) {
    return error;
  }
};

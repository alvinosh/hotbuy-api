module.exports = async (data, db) => {
  const { User, Post, Review } = db.models;
  try {
    return await User.findByPk(data.id, {
      include: [
        Post,
        {
          model: Review,
          foreignKey: "recieverId"
        }
      ]
    });
  } catch (error) {
    return error;
  }
};

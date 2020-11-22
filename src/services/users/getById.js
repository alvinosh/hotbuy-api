/**
 * Gets a user by id
 * @param {user id needed} data
 * @param {*} db
 */
module.exports = async (data, db) => {
  const { User, Post, Review, Comment } = db.models;
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
    throw error;
  }
};

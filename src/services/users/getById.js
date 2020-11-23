const createError = require("http-errors");

module.exports = async (data, db) => {
  const { User, Post, Review } = db.models;
  try {
    let user = User.findByPk(data.id, {
      include: [
        Post,
        {
          model: Review,
          foreignKey: "recieverId"
        }
      ]
    });

    if (!user) {
      throw new createError(404, "User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

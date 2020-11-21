module.exports = async (data, db) => {
  const { User, Post, Review } = db.models;

  const users = User.findAll({
    include: [
      Post,
      {
        model: Review,
        foreignKey: "recieverId"
      }
    ]
  });

  return users;
};

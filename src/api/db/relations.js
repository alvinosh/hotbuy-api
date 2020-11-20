function applyRelations(sequelize) {
  const { User, Post } = sequelize.models;

  User.hasMany(Post, {
    foreignKey: "userId"
  });
  Post.belongsTo(User, {
    foreignKey: "userId"
  });
}

module.exports = { applyRelations };

/**
 * Applying relations to the database
 * @param {db} sequelize
 */
function applyRelations(sequelize) {
  const { User, Post, Review, Comment } = sequelize.models;
  //Relations
  User.hasMany(Post, {
    foreignKey: "userId"
  });
  Post.belongsTo(User, {
    foreignKey: "userId"
  });
  Review.belongsTo(User, {
    foreignKey: "senderId"
  });
  Review.belongsTo(User, {
    foreignKey: "recieverId"
  });
  User.hasMany(Review, {
    foreignKey: "senderId"
  });
  User.hasMany(Review, {
    foreignKey: "recieverId"
  });
  User.hasMany(Comment, {
    foreignKey: "senderId"
  });
  Post.hasMany(Comment, {
    foreignKey: "postId"
  });
  Comment.belongsTo(Post, {
    foreignKey: "postId"
  });
}

module.exports = { applyRelations };

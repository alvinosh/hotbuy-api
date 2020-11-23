/**
 * Gets all users
 * @param {no data needed} data
 * @param {*} db
 */
module.exports = async (data, db) => {
  const { User, Review } = db.models;

  try {
    return await User.findAll({
      include: Review
    });
  } catch (error) {
    throw error;
  }
};

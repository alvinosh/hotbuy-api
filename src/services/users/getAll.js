/**
 * Gets all users
 * @param {no data needed} data
 * @param {*} db
 */
module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
};

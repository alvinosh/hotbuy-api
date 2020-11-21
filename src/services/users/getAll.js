module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
};

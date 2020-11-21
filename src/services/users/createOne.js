module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    return await User.create(data);
  } catch (error) {
    return error;
  }
};

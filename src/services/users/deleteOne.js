module.exports = async (data, db) => {
  const { User } = db.models;
  try {
    return await User.destroy({
      where: {
        id: data.id
      }
    });
  } catch (error) {
    throw error;
  }
};

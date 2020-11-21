module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    const emailExist = await User.findOne({ email: data.email });
    const usernameExist = await User.findOne({ username: data.username });

    if (emailExist) {
      throw new Error("Email is in use");
    }

    if (usernameExist) {
      throw new Error("Username is in use");
    }

    return await User.create(data);
  } catch (error) {
    throw error;
  }
};

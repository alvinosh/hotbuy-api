const bcrypt = require("bcryptjs");

module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    const emailExist = await User.findOne({ email: data.email });
    const usernameExist = await User.findOne({ username: data.username });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    if (emailExist) {
      throw new Error("Email is in use");
    }

    if (usernameExist) {
      throw new Error("Username is in use");
    }

    return await User.create({
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hash,
      phone: data.phone
    });
  } catch (error) {
    throw error;
  }
};

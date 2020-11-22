const bcrypt = require("bcryptjs");
const createError = require("http-errors");

/**
 * Registers new user
 * @param {all user data} data
 * @param {*} db
 */
module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    const emailExist = await User.findOne({ where: { email: data.email } });
    const usernameExist = await User.findOne({
      where: { username: data.username }
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);

    if (usernameExist) {
      throw new createError(400, "Username is in use");
    }

    if (emailExist) {
      throw new createError(400, "Email is in use");
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

const bcrypt = require("bcryptjs");
const createError = require("http-errors");

/**
 * Checks if user enters right values and returns token
 * @param {email and password} data
 * @param {*} db
 */
module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new createError(400, "Email Doesn't exist");
    }

    const validPass = await bcrypt.compare(
      data.password,
      user.dataValues.password
    );

    if (!validPass) {
      throw new createError(400, "Invalid password");
    } else {
      return user.dataValues;
    }
  } catch (error) {
    throw error;
  }
};

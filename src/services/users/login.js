const bcrypt = require("bcryptjs");
const createError = require("http-errors");

module.exports = async (data, db) => {
  const { User } = db.models;

  try {
    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      throw new createError(400, "Email not found");
    }

    const validPass = await bcrypt.compare(data.password, user.password);

    if (!validPass) {
      throw new createError(400, "Invalid password");
    } else {
      return user.id;
    }
  } catch (error) {
    throw error;
  }
};

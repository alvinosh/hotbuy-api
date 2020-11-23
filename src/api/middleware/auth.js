const jwt = require("jsonwebtoken");
/**
 * Read token from header and write it to request if valid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.body.token = verified;
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

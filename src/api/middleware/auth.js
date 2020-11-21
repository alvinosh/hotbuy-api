const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("token");

  if (!token) req.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.JWT_TOKEN);
    req.body = verified;
    next();
  } catch (error) {
    req.status(401).send("Invalid token");
  }
};

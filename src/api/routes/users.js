const { Router } = require("express");
const route = Router();
const UserController = require("../../services/index")("users");
const { register, login } = require("../validation");
const { celebrate } = require("celebrate");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

module.exports = (app, db) => {
  app.use("/users", route);
  /**
   * Get all users or get single user by id if query speficied
   */
  route.get("", async (req, res, next) => {
    try {
      let data;

      if (Object.keys(req.query).length === 0) {
        data = await UserController.getAll(req.body, db);
      }
      if (req.query.id) data = await UserController.getById(req.query, db);
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  /**
   * Get current logged in user
   */
  route.get("/me", auth, async (req, res, next) => {
    try {
      data = await UserController.getById(req.body, db);
      return res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  /**
   * Post new user and get back created user
   */
  route.post("/signup", celebrate(register), async (req, res, next) => {
    try {
      let user = await UserController.register(req.body, db);

      let token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN);
      return res
        .header("token", token)
        .send(JSON.stringify({ token: token, user: user }));
    } catch (e) {
      next(e);
    }
  });

  /** Post existing user email and password and returns token with user id inside */
  route.post("/login", celebrate(login), async (req, res, next) => {
    try {
      let user = await UserController.login(req.body, db);
      let token = jwt.sign({ id: user.id }, process.env.JWT_TOKEN);
      return res
        .header("token", token)
        .send(JSON.stringify({ token: token, user: user }));
    } catch (e) {
      next(e);
    }
  });

  /**
   * Delete current user with authenticated id
   */
  route.delete("", auth, async (req, res, next) => {
    try {
      await UserController.deleteOne(req.body, db);
      return res.status(201).send("User deleted");
    } catch (e) {
      next(e);
    }
  });
};

const { Router } = require("express");
const route = Router();
const UserController = require("../../services/index")("users");
const { register, login } = require("../validation");
const { celebrate, Joi } = require("celebrate");
const jwt = require("jsonwebtoken");

module.exports = (app, db) => {
  app.use("/users", route);

  route.get("", async (req, res, next) => {
    try {
      let data;

      if (Object.keys(req.query).length === 0) {
        data = await UserController.getAll(req.body, db);
      }
      if (req.query.id) data = await UserController.getById(req.query, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.post("/signup", celebrate(register), async (req, res, next) => {
    try {
      let user = await UserController.register(req.body, db);
      res.status(201).send(user);
    } catch (e) {
      next(e);
    }
  });

  route.post("/login", celebrate(login), async (req, res, next) => {
    try {
      let userId = UserController.login(req.body, db);
      let token = jwt.sign({ id, userId }, process.env.JWT_TOKEN);
      res.header("token", token).send(token);
    } catch (e) {
      next(e);
    }
  });
};

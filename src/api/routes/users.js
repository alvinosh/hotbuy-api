const { Router } = require("express");
const route = Router();
const controller = require("../../services/index")("users");

module.exports = (app, db) => {
  app.use("/users", route);

  route.get("/", async (req, res) => {
    let data = controller.getAll(req, db);
    res.status(200).send(data);
  });
};

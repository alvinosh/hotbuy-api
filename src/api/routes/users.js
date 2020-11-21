const { Router } = require("express");
const route = Router();
const UserController = require("../../services/index")("users");

module.exports = (app, db) => {
  app.use("/users", route);

  route.get("", async (req, res) => {
    let data;

    if (Object.keys(req.query).length === 0) {
      data = await UserController.getAll(req.body, db);
    }
    if (req.query.id) data = await UserController.getById(req.query, db);
    res.status(200).send(data);
  });

  route.post("", async (req, res) => {
    if (req.body.id)
      res.status(401).send(
        `Bad Request : 
				ID should not be provided as it is configured automatically`
      );

    res.status(201).send(await UserController.createOne(req.body, db));
  });
};

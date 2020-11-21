const { Router } = require("express");
const route = Router();
const PostController = require("../../services/index")("posts");

module.exports = (app, db) => {
  app.use("/posts", route);

  route.get("", async (req, res) => {
    try {
      let data;

      if (Object.keys(req.query).length === 0) {
        data = await PostController.getAll(req.body, db);
      }
      if (req.query.id) data = await PostController.getById(req.query, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.post("", async (req, res) => {
    try {
      res.status(201).send(await PostController.createOne(req.body, db));
    } catch (e) {
      next(e);
    }
  });
};

const { Router } = require("express");
const route = Router();
const CommentController = require("../../services/index")("comments");

module.exports = (app, db) => {
  app.use("/comments", route);

  route.get("", async (req, res, next) => {
    try {
      let data;
      if (Object.keys(req.query).length === 0) {
        data = await CommentController.getAll(req.body, db);
      }
      if (req.query.id) data = await CommentController.getById(req.query, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.post("", async (req, res, next) => {
    try {
      res.status(201).send(await CommentController.createOne(req.body, db));
    } catch (e) {
      next(e);
    }
  });
};

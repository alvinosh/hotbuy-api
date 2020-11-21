const { Router } = require("express");
const route = Router();
const ReviewController = require("../../services/index")("reviews");

module.exports = (app, db) => {
  app.use("/reviews", route);

  route.get("", async (req, res) => {
    try {
      let data;

      if (Object.keys(req.query).length === 0) {
        data = await ReviewController.getAll(req.body, db);
      }
      if (req.query.id) data = await ReviewController.getById(req.query, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.post("", async (req, res) => {
    try {
      res.status(201).send(await ReviewController.createOne(req.body, db));
    } catch (e) {
      next(e);
    }
  });
};

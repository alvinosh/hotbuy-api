const { Router } = require("express");
const route = Router();
const ReviewController = require("../../services/index")("reviews");

module.exports = (app, db) => {
  app.use("/reviews", route);

  route.get("", async (req, res) => {
    let data;

    if (Object.keys(req.query).length === 0) {
      data = await ReviewController.getAll(req.body, db);
    }
    if (req.query.id) data = await ReviewController.getById(req.query, db);
    res.status(200).send(data);
  });

  route.post("", async (req, res) => {
    if (req.body.id)
      res.status(401).send(
        `Bad Request : 
				ID should not be provided as it is configured automatically`
      );

    res.status(201).send(await ReviewController.createOne(req.body, db));
  });
};

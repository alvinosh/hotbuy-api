const { Router } = require("express");
const route = Router();
const ReviewController = require("../../services/index")("reviews");
const auth = require("../middleware/auth");
const { celebrate } = require("celebrate");
const { review, queryId } = require("../validation");
module.exports = (app, db) => {
  app.use("/reviews", route);

  route.get("/me/recieved", auth, async (req, res, next) => {
    try {
      data = await ReviewController.getRecieved(req.token, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.get("/me/sent", auth, async (req, res, next) => {
    try {
      data = await ReviewController.getSent(req.token, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.get("/recieved", celebrate(queryId), async (req, res, next) => {
    try {
      data = await ReviewController.getRecieved(req.query, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.get("/sent", celebrate(queryId), async (req, res, next) => {
    try {
      data = await ReviewController.getSent(req.query, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.get("", celebrate(queryId), async (req, res, next) => {
    try {
      data = await ReviewController.getById(req.query, db);
      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  });

  route.post("", celebrate(review), auth, async (req, res, next) => {
    try {
      res.status(201).send(await ReviewController.createOne(req.body, db));
    } catch (e) {
      next(e);
    }
  });

  route.delete("", auth, async (req, res, next) => {
    try {
      let review = await ReviewController.deleteOne(req.body, db);
      res.status(201).send(JSON.stringify(review));
    } catch (e) {
      next(e);
    }
  });
};

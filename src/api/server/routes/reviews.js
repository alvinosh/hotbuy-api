const { getIdParam } = require("../helpers");
const sequelize = require("../../db/sequelize");

const { Review } = sequelize.models;

async function getAll(req, res) {
  const reviews = await Review.findAll();
  res.status(200).json(reviews);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const review = await Review.findByPk(id);
  if (review) {
    res.status(200).json(review);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    console.log(req.body);
    await Review.create(req.body);
    res.status(201).end();
  }
}

async function remove(req, res) {
  const id = getIdParam(req);
  await Review.destroy({
    where: {
      id: id
    }
  });
  res.status(200).end();
}

module.exports = {
  getAll,
  getById,
  create,
  remove
};

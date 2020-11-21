const { getIdParam } = require("../helpers");
const sequelize = require("../../db/sequelize");

const { Comment } = sequelize.models;

async function getAll(req, res) {
  const comments = await Comment.findAll();
  res.status(200).json(comments);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const comment = await Comment.findByPk(id);
  if (comment) {
    res.status(200).json(comment);
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
    await Comment.create(req.body);
    res.status(201).end();
  }
}

async function remove(req, res) {
  const id = getIdParam(req);
  await Comment.destroy({
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

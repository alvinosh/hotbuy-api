const { getIdParam } = require("../helpers");
const sequelize = require("../../db/sequelize");

const Post = sequelize.models.Post;

async function getAll(req, res) {
  const users = await Post.findAll();
  res.status(200).json(users);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const user = await Post.findByPk(id);
  if (user) {
    res.status(200).json(user);
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
    await Post.create(req.body);
    res.status(201).end();
  }
}

async function remove(req, res) {
  const id = getIdParam(req);
  await Post.destroy({
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

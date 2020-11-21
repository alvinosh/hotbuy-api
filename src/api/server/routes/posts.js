const { getIdParam } = require("../helpers");
const sequelize = require("../../db/sequelize");

const { Post, Comment } = sequelize.models;

async function getAll(req, res) {
  const posts = await Post.findAll({
    include: Comment
  });
  res.status(200).json(posts);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const post = await Post.findByPk(id, {
    include: Comment
  });
  if (post) {
    res.status(200).json(post);
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

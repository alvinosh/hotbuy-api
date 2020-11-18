const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./db/sequelize");
require("dotenv").config({ path: "./config/.env" });

async function assertDatabaseConnection() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function initServer() {
  await assertDatabaseConnection();

  const app = express();
  app.use(bodyParser.json());

  const PORT = process.env.PORT;

  console.log(`Starting server on port${PORT}`);

  app.post("/api/posts", (req, res) => {
    sequelize.models.Post.create({
      title: "lol",
      description: "idek lmao"
    }).then((post) => res.json(post));
  });

  app.get("/api/posts", async (req, res) => {
    console.log(req.query.id);
    const post = await sequelize.models.Post.findByPk(req.query.id);
    if (post === null) {
      console.log("Not found!");
    } else {
      console.log(post instanceof sequelize.models.Post); // true
      // Its primary key is 123
    }
    res.status(200).json(post);
  });

  app.listen(PORT);
}

initServer();

const express = require("express");
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
  const PORT = process.env.PORT;

  console.log(`Starting server on port ${PORT}`);

  app.get("/api/posts", (req, res) => {
    const users = sequelize.models.Post.findAll();
    res.status(200).json(users);
  });

  app.listen(PORT);
}

initServer();

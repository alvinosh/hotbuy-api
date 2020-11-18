const express = require("express");
const sequelize = require("./db/sequelize");
require("dotenv").config({ path: "./config/.env" });
const app = express();

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

  const PORT = process.env.PORT;

  console.log(`Starting server on port ${PORT}`);

  app.get("/", (req, res) => {
    res.send("<h1>Im hot</h1>");
  });

  app.listen(PORT);
}

initServer();

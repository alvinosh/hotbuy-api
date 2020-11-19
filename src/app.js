const app = require("./api/server/server");
const sequelize = require("./api/db/sequelize");
require("dotenv").config({ path: "./config/.env" });

async function assertDatabaseConnection() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(2);
  }
}

async function initServer() {
  await assertDatabaseConnection();

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(
      `Express server started on port ${PORT}. Try some routes, such as '/api/users'.`
    );
  });
}

initServer();

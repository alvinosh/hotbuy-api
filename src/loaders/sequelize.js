const { Sequelize, DataTypes } = require("sequelize");
const { applyRelations } = require("./relations");
const fs = require("fs");
const path = require("path");

//Get App Directory
const appDir = path.dirname(require.main.filename);
//Get ENV Variables

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pwd = process.env.DB_PWD;
const db_url = process.env.DB_URL;

//Require all models from ./models folder
const models = fs.readdirSync(path.join(appDir, "models")).map((f) => {
  return require(`../models/${f}`);
});

//Initialize DB connection
const sequelize = new Sequelize(
  `postgres://${db_user}:${db_pwd}@${db_url}:5432/${db_name}`,
  { logging: false }
);

//Model all models
for (const model of models) {
  model(sequelize, DataTypes);
}

//Apply relations
applyRelations(sequelize);

//Sync DBs
sequelize.sync({ alter: true }).then(() => {
  console.log(`Database & tables created!`);
});

async function testConnection() {
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
testConnection();
module.exports = sequelize;

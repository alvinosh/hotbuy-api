const { Sequelize } = require("sequelize");

require("dotenv").config({ path: "./config/.env" });

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_pwd = process.env.DB_PWD;
const db_url = process.env.DB_URL;

const models = [require("./models/Post")];

const sequelize = new Sequelize(
  `postgres://${db_user}:${db_pwd}@${db_url}:5432/${db_name}`
);

for (const model of models) {
  model(sequelize);
}

sequelize.sync({ alter: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = sequelize;

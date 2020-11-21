const expressLoader = require("./express");
const sequelizeLoader = require("./sequelize");

module.exports = async (expressApp) => {
  const sequelize = sequelizeLoader;

  await expressLoader(expressApp, sequelize);
  console.log("Express Loaded");
};

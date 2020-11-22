const expressLoader = require("./express");
const sequelizeLoader = require("./sequelize");

/**
 * loading everything
 * @param {*} expressApp
 */
module.exports = async (expressApp) => {
  const sequelize = sequelizeLoader;

  await expressLoader(expressApp, sequelize);
  console.log("Express Loaded");
};

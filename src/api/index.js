const Router = require("express");
const { getRoutes } = require("./helpers");
/**
 * loads all routs
 * @param {database} db
 */
module.exports = (db) => {
  const app = Router();

  const routes = getRoutes();

  routes.forEach((route) => {
    route(app, db);
  });

  return app;
};

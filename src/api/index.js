const Router = require("express");
const { getRoutes } = require("./helpers");
// guaranteed to get dependencies
module.exports = (db) => {
  const app = Router();

  const routes = getRoutes();

  routes.forEach((route) => {
    route(app, db);
  });

  return app;
};

const bodyParser = require("body-parser");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const routes = require("../api");
var cors = require("cors");
const createError = require("http-errors");
const { celebrate, Joi, errors, Segments } = require("celebrate");

module.exports = (app, db) => {
  //Allow CORS from svelte localhost
  //Use bodyparser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());

  // We provide a root route just as an example
  app.get("/", (req, res) => {
    res.sendFile(path.join(appDir, "public/index.html"));
  });

  app.use("/api", routes(db));

  app.use(errors());

  app.use((error, req, res, next) => {
    if (createError.isHttpError(error)) {
      res.status(error.status);
      // Sends response
      res.json({
        status: error.status,
        message: error.message,
        stack: error.stack
      });
    } else {
      console.log(error);
      next(error);
    }
  });
};

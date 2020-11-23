const bodyParser = require("body-parser");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const routes = require("../api");
var cors = require("cors");
const createError = require("http-errors");
const { errors } = require("celebrate");

/**
 *
 * @param {app gotted from entry point} app
 * @param {database} db
 */
module.exports = (app, db) => {
  /** Use bodyparser */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  /** Allow all CORS */
  app.use(cors());

  /** Root route for api docs */
  app.get("/api/docs", (req, res) => {
    res.sendFile(path.join(appDir, "public/index.html"));
  });

  /** Using /api with all of the api routes */
  app.use("/api", routes(db));

  /** Validation error handling */
  app.use(errors());

  /** HTTP errors handling */
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

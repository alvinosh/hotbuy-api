const bodyParser = require("body-parser");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const routes = require("../api");
var cors = require("cors");
const createError = require("http-errors");
const { errors, isCelebrateError } = require("celebrate");

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
  app.use((err, req, res, next) => {
    // If this isn't a Celebrate error, send it to the next error handler
    if (!isCelebrateError(err)) {
      return next(err);
    }
    const result = {
      statusCode: 400,
      error: "Bad Request",
      message: err.details.get("body").details[0].message
    };

    return res.status(400).send(result);
  });

  /** HTTP errors handling */
  app.use((error, req, res, next) => {
    if (createError.isHttpError(error)) {
      res.status(error.status);
      // Sends response
      res.json({
        status: error.status,
        error: "HTTP ERROR",
        message: error.message,
        stack: error.stack
      });
    } else {
      console.log(error);
      next(error);
    }
  });
};

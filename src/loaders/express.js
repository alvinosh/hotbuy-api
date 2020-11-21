const bodyParser = require("body-parser");
const path = require("path");
const appDir = path.dirname(require.main.filename);
const routes = require("../api");
module.exports = (app, db) => {
  //Allow CORS from svelte localhost
  //Use bodyparser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // We provide a root route just as an example
  app.get("/", (req, res) => {
    res.sendFile(path.join(appDir, "public/index.html"));
  });

  app.use("/api", routes(db));
};

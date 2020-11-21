const express = require("express");
const path = require("path");
const appDir = path.dirname(require.main.filename);
require("dotenv").config({
  path: path.join(appDir, "/config/.env")
});

async function initServer() {
  const PORT = process.env.PORT;

  const app = express();

  const expressApp = require("./loaders");
  expressApp(app);

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
  });
}

initServer();

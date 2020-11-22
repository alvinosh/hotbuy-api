const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);

/**
 * Gets all routes from /routes folder
 */
function getRoutes() {
  let routes = [];
  let files = fs.readdirSync(path.join(appDir, "api/routes"));

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find routes");
  }

  jsfile.forEach((file, i) => {
    let name = file.split(".")[0];
    routes[i] = require(`./routes/${name}`);
    console.log(`Route : ${file} loaded`);
  });

  return routes;
}

module.exports = { getRoutes };

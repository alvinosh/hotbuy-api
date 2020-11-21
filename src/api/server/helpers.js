const fs = require("fs");
const path = require("path");
const appDir = path.dirname(require.main.filename);

function getIdParam(req) {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  throw new TypeError(`Invalid ':id' param: "${id}"`);
}

function getRoutes() {
  let routes = {};
  console.log("jsfile");

  let files = fs.readdirSync(path.join(appDir, "api/server/routes"));

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find routes");
  }

  jsfile.forEach((file, i) => {
    let name = file.split(".")[0];
    routes[name] = require(`./routes/${name}`);
    console.log(`Route : ${file} loaded`);
  });

  return routes;
}

module.exports = { getIdParam, getRoutes };

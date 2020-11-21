const fs = require("fs");
const path = require("path");

//Get App Directory
const appDir = path.dirname(require.main.filename);

module.exports = (type) => {
  let routes = {};
  let files = fs.readdirSync(path.join(appDir, "services", type));

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find services");
  }

  jsfile.forEach((file, i) => {
    let name = file.split(".")[0];
    routes[name] = require(`./${type}/${name}`);
    console.log(`Service : ${file} : ${type} loaded`);
  });

  return routes;
};

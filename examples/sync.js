const Config = require("../index");

const config = new Config({
  path: "./config",
  format: "yml", // Optional
  provider: "FileSystem",
  env: "production"
});

try {
  config.loadSync();
  console.log(config.get("the").url);
} catch (err) {
  console.log("Failed to load the config: ", err);
}

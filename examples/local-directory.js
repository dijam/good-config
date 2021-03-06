const Config = require("../index");

const config = new Config({
  path: "./config",
  format: "yml", // Optional
  provider: "FileSystem",
  env: "production",
  region: "EUW"
});

config
  .load()
  .then(() => {
    const url = config.get("the").url;
    console.log(url);
  })
  .catch(err => {
    console.log("Failed to load the config: ", err);
  });

const Config = require("../index");

process.env.THE_URL = "http://newURL";

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
    delete process.env.THE_URL;
  })
  .catch(err => {
    console.log("Failed to load the config: ", err);
    delete process.env.THE_URL;
  });

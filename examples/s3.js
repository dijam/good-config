const Config = require("../index");

const config = new Config({
  path: "media-service",
  awsBucket: "config",
  format: "json", // Optional
  awsAccessKeyId: process.env.AwsAccessKeyId, // Replace this with your AccessKey
  awsSecretAccessKey: process.env.AwsSecretAccessKey, // Replace this with your Secret
  awsRegion: process.env.AwsRegion, // Optional
  provider: "S3"
});

config
  .load()
  .then(() => {
    console.log(config.get("server.port"));
  })
  .catch(err => {
    console.log("Failed to load the config: ", err);
  });

const Provider = require("./provider");
const AWS = require("aws-sdk");

/**
 * S3 class in order to fetch config files from AWS S3
 */
class S3 extends Provider {
  /**
   * S3 constructor
   *
   * @param  {Object} options
   * @param  {Object} options.awsBucket          Name of the bucket
   * @param  {Object} options.awsAccessKeyId     AWS AccessKey ID
   * @param  {Object} options.awsSecretAccessKey AWS SecretAccessKey
   * @param  {Object} options.awsRegion          AWS Region
   */
  constructor(options) {
    super(options);

    this.bucket = options.awsBucket;
    this.s3SDK = new AWS.S3({
      accessKeyId: options.awsAccessKeyId,
      secretAccessKey: options.awsSecretAccessKey,
      region: options.awsRegion || "eu-west-1"
    });
  }

  /**
   * Loads a config file
   *
   * @param  {String} file File to be loaded
   *
   * @return {Object}      File content
   */
  loadConfig(file) {
    return new Promise((resolve, reject) => {
      const getObjectPromise = this.s3SDK
        .getObject({
          Bucket: this.bucket,
          Key: file
        })
        .promise();

      return getObjectPromise
        .then(data => resolve(this.parseFile(data.Body.toString())))
        .catch(err => reject(err));
    });
  }
}

module.exports = S3;

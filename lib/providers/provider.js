/* eslint class-methods-use-this: ["error", { "exceptMethods":
 ["loadConfig", "loadConfigSync"] }] */

const yaml = require("yamljs");

/**
 * Provider parent class in order to handle some of the generic functionalities
 */
class Provider {
  /**
   * Provider constructor
   *
   * @param  {Object} options
   * @param  {String} options.path   Path of the config files
   * @param  {String} options.format Format of the config files
   * @param  {Array} options.files   List of files
   *
   * @return {[type]}         [description]
   */
  constructor(options) {
    this.path = options.path || "./config";
    this.fileExtension = options.format;
    this.files = options.files;
  }

  /**
   * Loads a config file
   */
  loadConfig() {
    return Promise.reject(
      new Error(
        "No provider has been selected or provider does not implement loadConfig()."
      )
    );
  }

  /**
   * Loads a config file synchronously
   */
  loadConfigSync() {
    throw new Error(
      "No provider has been selected or provider does not implement loadConfigSync()."
    );
  }

  /**
   * Parsing files based on the given extension. It return original content
   * if couldn't find the extension
   *
   * @param  {String} fileString File content
   *
   * @return {Object|string}
   */
  parseFile(fileString) {
    if (this.fileExtension === "json") {
      return JSON.parse(fileString);
    }

    if (this.fileExtension === "yml") {
      return yaml.parse(fileString);
    }

    return fileString;
  }

  /**
   * Returns list of loaded config
   *
   * @return {Array}
   */
  get() {
    return new Promise((resolve, reject) => {
      const filesList = [];

      if (!this.files) {
        return reject(new Error("No file has been found"));
      }

      this.files.forEach(file =>
        filesList.push(this.loadConfig(`${this.path}/${file}`))
      );

      return Promise.all(filesList)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  /**
   * Returns list of loaded config, synchronously
   *
   * @return {Array}
   */
  getSync() {
    if (!this.files) {
      throw new Error("No file has been found");
    }

    return this.files.map(file => this.loadConfigSync(`${this.path}/${file}`));
  }
}

module.exports = Provider;

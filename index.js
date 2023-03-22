const MergeConfig = require("merge-config-updated");
const storage = require("./lib/storage");
const envify = require("./lib/envify");

/**
 * Config class
 *
 * It accepts a path to the config directory, provider name for loading configs
 * and selected format for opening/parsing configs
 */
class Config {
  /**
   * constructor method
   *
   * @param  {Object} options
   * @param  {String} options.provider Name of the provider class
   * @param  {String} options.format   Format of config files
   * @param  {String} options.env      NODE_ENV env content
   * @param  {String} options.region   REGION env content
   */
  constructor(options = {}) {
    this.options = options;
    this.options.provider = options.provider || "FileSystem";
    this.options.format = options.format || "json";
    this.options.env = options.env || "default";
    this.options.region = options.region || "default";
    this.conf = {};
  }

  static createMergeConfig(configs) {
    const mergeConfig = new MergeConfig();

    // Default config to empty
    mergeConfig.merge({});

    // Loop over the given configs and add them based on array's hierarchy
    configs.forEach(config => {
      mergeConfig.merge(config);
    });

    // Add a command-line arguments override
    mergeConfig.argv();

    // Add an environment variables override
    // mergeConfig.env();
    mergeConfig.merge(envify.envify(mergeConfig.get()));

    return mergeConfig;
  }

  /**
   * It loads the content configs based on the priority that has been provided
   */
  load() {
    this.options.files = this.getPriorities();

    return storage
      .load(this.options)
      .then(Config.createMergeConfig)
      .then(mergeConfig => {
        this.conf = mergeConfig;
        return this;
      });
  }

  /**
   * It synchronously loads the content configs based on the priority that has been provided
   */
  loadSync() {
    this.options.files = this.getPriorities();
    this.conf = Config.createMergeConfig(storage.loadSync(this.options));
    return this;
  }

  /**
   * Returns array of prioritised config files based on env and region
   *
   * @return {[type]} [description]
   */
  getPriorities() {
    const files = [`default.${this.options.format}`];

    // Load default node env first
    if (this.options.env !== "default") {
      files.push(`${this.options.env}/default.${this.options.format}`);
    }

    // Load region after default env, in order to keep the hierarchy correctly
    if (this.options.env !== "default" && this.options.region !== "default") {
      files.push(
        `${this.options.env}/${this.options.region}.${this.options.format}`
      );
    }

    return files;
  }

  /**
   * Returns specific key from configs
   *
   * @return {String|Number|Boolean}
   */
  get(key) {
    return this.conf.get(key);
  }

  /**
   * Returns all configs
   *
   * @return {Object}
   */
  getAll() {
    return this.conf.get();
  }
}

module.exports = Config;

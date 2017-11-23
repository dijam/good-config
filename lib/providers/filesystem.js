
const fs = require('fs');
const Provider = require('./provider');

/**
 * FileSystem class in order to fetch config files from local system
 */
class FileSystem extends Provider {

  /**
   * Loads a config file
   *
   * @param  {String} file File to be loaded
   *
   * @return {Object}      File content
   */
  loadConfig(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }

        return resolve(this.parseFile(data));
      });
    });
  }

  /**
   * Loads a config file synchronously
   *
   * @param  {String} file File to be loaded
   *
   * @return {Object}      File content
   */
  loadConfigSync(file) {
    return this.parseFile(fs.readFileSync(file, 'utf8'));
  }
}

module.exports = FileSystem;

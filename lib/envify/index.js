/*
  The idea is to have a wrapper for config so we can rewrite configs
  via environmental variables which is useful for using in docker.

  This module, accepts an object and trys to match keys inside it with
  environmental variables. So if our object contains {myKey: 'my value'}
  It looks for MYKEY in env variables and if found, it overwrites the value
  of that env variable with our object's key.
  It also has supoort for nested variables and arrays:
  {myKey: {mySecondKey: 'my value'}} => MYKEY_MYSECONDKEY='my value'
  {myKey: ['val1', 'val2']} => MYKEY_0='val1' MYKEY_1='val2'
*/
const flat = require("flat");

/**
 * It accepts a string and replaces dots with underscore and
 * upper case the text
 *
 * @param  {String} text
 *
 * @return {String}
 */
function upperUnderscore(text) {
  return text
    .toUpperCase()
    .split(".")
    .join("_");
}

/**
 * It accpts a string variable and original value. It changes the given string
 * value's type to desired type of original value.
 *
 * @param  {String} stringValue   Value with String as type that needs to be converted
 * @param  {*}      originalValue Original value that we need to extract type
 *
 * @return {*}
 */
function typeify(stringValue, originalValue) {
  let result;
  switch (typeof originalValue) {
    case "boolean":
      result = stringValue.toLowerCase() === "true";
      break;
    case "number":
      result = parseInt(stringValue, 10) || null;
      break;
    default:
      result = stringValue;
  }

  return result;
}

/**
 * It accepts an object and check if any environment variable exists for it.
 * It will replace value of that key and return original updated object.
 *
 * @param  {Object} data
 *
 * @return {Object}
 */
function envify(data) {
  if (!(data instanceof Object)) {
    throw new Error("invalid config file");
  }

  const flattened = flat.flatten(data);
  const envs = process.env;

  Object.keys(flattened).forEach(key => {
    if (
      flattened[key] &&
      Object.prototype.hasOwnProperty.call(envs, upperUnderscore(key))
    ) {
      // You can uncomment this line in order to get information what key has been replaced.
      // console.log(`Replaced config key ${key} from env variables!`);
      flattened[key] = typeify(envs[upperUnderscore(key)], flattened[key]);
    }
  });

  return flat.unflatten(flattened);
}

module.exports = {
  envify,
  typeify,
  upperUnderscore
};

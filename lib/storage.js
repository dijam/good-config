const providers = require("./providers");

/**
 * Returns provider based on the given name
 *
 * @param  {String} providerName Name of the provider
 *
 * @return {Provider|null}
 */
function getProviderFromString(providerName) {
  if (typeof providers[providerName] === "function") {
    return providers[providerName];
  }

  return null;
}

/**
 * Load array of configs based on the requested options
 *
 * @param  {Object} options          Options
 * @param  {String} options.provider Provider name
 *
 * @return {Array}
 */
function load(options) {
  const Provider = getProviderFromString(options.provider);
  if (!Provider) {
    return Promise.reject(
      new Error(`Provider ${options.provider} is not supported`)
    );
  }

  const provider = new Provider(options);
  return provider.get();
}

/**
 * Load array of configs synchronously based on the requested options
 *
 * @param  {Object} options          Options
 * @param  {String} options.provider Provider name
 *
 * @return {Array}
 */
function loadSync(options) {
  const Provider = getProviderFromString(options.provider);
  if (!Provider) {
    throw new Error(`Provider ${options.provider} is not supported`);
  }

  const provider = new Provider(options);
  return provider.getSync();
}

module.exports = {
  load,
  loadSync,
  getProviderFromString
};

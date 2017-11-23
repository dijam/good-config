const Config = require('../../index');

const config = new Config({
  path: './config',
  format: 'yml', // Optional
  provider: 'FileSystem',
  env: 'production',
  region: 'EUW',
});

try {
  config.loadSync();
  console.log(config.get('THE_URL'));
} catch (err) {
  console.log('Failed to load the config: ', err);
}

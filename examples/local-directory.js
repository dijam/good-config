const Config = require('../../index');

const config = new Config({
  path: './config',
  format: 'yml', // Optional
  provider: 'FileSystem',
  env: 'production',
  region: 'EUW',
});

config
  .load()
  .then(() => {
    const url = config.get('THE_URL');
    console.log(url === 'https://www.majidsadeghi.eu');
  })
  .catch((err) => {
    console.log('Failed to load the config: ', err);
  });

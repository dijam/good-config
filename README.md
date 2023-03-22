# good-config

Easy to use centralized config with the goal of having config simple and extendable.

## Version 1.2.0
Update dependencies and remove S3 support

## Version 1.1.2
Update dependencies (#5)

## Version 1.1.1
Fixed the bug (#2) which ignores empty values to be set bia environmental variables.

## Version 1.1.0

Added envify functionality. It means you can now just define your config the way you want (json/yml). In run time, if you needed to overwrite a key, just follow Uppercase+Underscore and you would be able to overwrite it.
For example you have a config like this:

```
{
  key1: "value1",
  key2: {
    subKey: 1,
    anotherKey: "changeme"
  }
}
```

Say you want to change `anotherKey` value via environmental variables. You can just set `KEY2_ANOTHERKEY` to the value you want and good-config will replace it with the correct value.

## Main features

- Supports for both `yaml` and `json`
- Possibility to add your own provider
- Hierarchical support thanks to [merge-config](https://github.com/telefonica/node-merge-config)
- Envify support: You can overwrite any config key via env variables and envify convert `parent.key` to `PARENT_KEY`

Currently it has these providers:

- FileSystem
- Feel free to make PR for other providers

## Installation

```bash
npm install good-config
```

## File structure

```
/myproduct
    default.json
    production/
        default.json
        euw.json
    staging/
        default.json
        euw.json
        use.json
```

## How to use

To get the config before starting the app, just wrap the server startup call in `app.js`.

```js
const Config = require("good-config");

const config = new Config({
  path: "media-service",
  format: "json", // Optional
});

config
  .load()
  .then(() => {
    app.listen(config.get("port"), function() {
      console.log("Express app listening on port " + config.get("port"));
    });
  })
  .catch(err => {
    console.log("Failed to load the config");
  });
```

## Synchronous loading

There is also the option of loading config from filesystem synchronously, by calling `config.loadSync()`. See [examples](/examples) folder.

## Available options

- `path` : Path to the config file.
- `format`: Format of config files - Default `json`
- `provider`: Name of the provider class, [`FileSystem`]
- `env`: Content of NODE_ENV, [`production`, `development`, ...]

## License

Copyright 2017- [Majid Garmaroudi](garmaroudi.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

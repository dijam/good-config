const Config = require("../index");
const configbasePath = "/data/";

describe("config", () => {
  describe("#constructor", () => {
    afterEach(() => {
      delete process.env.version;
    });

    it("should set the default values", () => {
      const options = {
        path: `blabla`,
        important: "zoidberg"
      };

      const config = new Config(options);

      expect(config).to.have.property("options");
      expect(config.options).to.be.eql(options);
      expect(config.options).to.have.property("provider");
      expect(config.options.provider).to.be.equal("FileSystem");
      expect(config.options).to.have.property("format");
      expect(config.options.format).to.be.equal("json");
      expect(config.options).to.have.property("env");
      expect(config.options.env).to.be.equal("default");
      expect(config.options).to.have.property("region");
      expect(config.options.region).to.be.equal("default");
      expect(config).to.have.property("conf");
      expect(config.conf).to.be.eql({});
    });

    it("should set the default config if no node env has been specified", done => {
      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem"
      });

      const results = {
        version: "v1",
        bestshow: {
          name: "futurama",
          episode: 111
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config
        .load()
        .then(configObject => {
          expect(config.getAll()).to.containSubset(results);
          expect(config.get("bestshow").episode).to.equal(111);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should set the default config and override with node env specific value", done => {
      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem",
        env: "zoidberg"
      });
      const results = {
        version: "v1",
        bestshow: {
          name: "futurama",
          episode: 222
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config
        .load()
        .then(configObject => {
          expect(config.getAll()).to.containSubset(results);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should set the default config and overwrite with env specified value", done => {
      process.env.version = "v3";

      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem",
        env: "zoidberg"
      });
      const results = {
        version: "v3",
        bestshow: {
          name: "futurama",
          episode: 222
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config
        .load()
        .then(configObject => {
          expect(config.getAll()).to.containSubset(results);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should set the default config and overwrite with env and region specific values", done => {
      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem",
        env: "zoidberg",
        region: "wormulon"
      });

      const results = {
        version: "v1",
        bestshow: {
          name: "Fry and the Slurm Factory",
          episode: 13,
          newCharacter: {
            name: "Zapp Brannigan"
          }
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config
        .load()
        .then(configObject => {
          expect(config.getAll()).to.containSubset(results);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should set the default config and overwrite with env and region specific values and env variable overwrite", done => {
      process.env.version = "v3";

      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem",
        env: "zoidberg",
        region: "wormulon"
      });

      const results = {
        version: "v3",
        bestshow: {
          name: "Fry and the Slurm Factory",
          episode: 13,
          newCharacter: {
            name: "Zapp Brannigan"
          }
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config
        .load()
        .then(configObject => {
          expect(config.getAll()).to.containSubset(results);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should set the default config and overwrite with env and region specific values and env variable overwrite and use yml", done => {
      process.env.version = "v3";

      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem",
        format: "yml",
        env: "zoidberg",
        region: "eu"
      });

      const results = {
        version: "v3",
        bestshow: {
          name: "futurama",
          episode: 33
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config
        .load()
        .then(configObject => {
          expect(config.getAll()).to.containSubset(results);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should set the default config and overwrite with env and region specific values and new env variable overwrite", done => {
      process.env.BESTSHOW_NEWCHARACTER_NAME = "Kif Kroker";

      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem",
        env: "zoidberg",
        region: "wormulon"
      });

      const results = {
        version: "v1",
        bestshow: {
          name: "Fry and the Slurm Factory",
          episode: 13,
          newCharacter: {
            name: "Kif Kroker"
          }
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config
        .load()
        .then(configObject => {
          expect(config.getAll()).to.containSubset(results);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("should throw error if storage failed to load config", done => {
      const config = new Config({
        path: `${__dirname}${configbasePath}watever`,
        provider: "FileSystem"
      });

      const results = {
        version: "v1",
        bestshow: {
          name: "futurama",
          episode: 111,
          newCharacter: {
            name: "Zapp Brannigan"
          }
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      config.load().should.be.rejected.and.notify(done);
    });

    it("should read config synchronously and set the default config and overwrite with env and region specific values and env variable overwrite and use yml", done => {
      process.env.version = "v3";

      const config = new Config({
        path: `${__dirname}${configbasePath}defaults`,
        provider: "FileSystem",
        format: "yml",
        env: "zoidberg",
        region: "eu"
      });

      const results = {
        version: "v3",
        bestshow: {
          name: "futurama",
          episode: 33
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      };

      const configObject = config.loadSync();
      expect(configObject.getAll()).to.containSubset(results);
      done();
    });
  });
});

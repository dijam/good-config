const FileSystem = require("../../../lib/providers/filesystem");
const configbasePath = "/../../data/";

describe("fileSystem", () => {
  it("should load only the default file", done => {
    const filesystem = new FileSystem({
      env: "default",
      region: "default",
      path: `${__dirname}${configbasePath}defaults`,
      files: [`default.json`],
      format: "json"
    });

    const results = [
      {
        version: "v1",
        bestshow: {
          name: "futurama",
          episode: 111
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      }
    ];

    expect(filesystem.get())
      .to.eventually.eql(results)
      .notify(done);
  });

  it("should load multiple files", done => {
    const filesystem = new FileSystem({
      files: [`default.json`, `zoidberg/default.json`],
      path: `${__dirname}${configbasePath}defaults`,
      format: "json"
    });

    const results = [
      {
        version: "v1",
        bestshow: {
          name: "futurama",
          episode: 111
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      },
      {
        bestshow: {
          episode: 222
        }
      }
    ];

    expect(filesystem.get())
      .to.eventually.eql(results)
      .notify(done);
  });

  it("should load the default file with yaml format", done => {
    const filesystem = new FileSystem({
      files: [`default.yml`],
      path: `${__dirname}${configbasePath}defaults`,
      format: "yml"
    });

    const results = [
      {
        version: "v1",
        bestshow: {
          name: "futurama",
          episode: 111
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      }
    ];

    expect(filesystem.get())
      .to.eventually.eql(results)
      .notify(done);
  });

  it("should throw error if could not load the config files", done => {
    const fileSystem = new FileSystem({
      files: [`zoidberg.yml`],
      path: `${__dirname}${configbasePath}specific`,
      format: "yml"
    });

    fileSystem.get().should.be.rejected.and.notify(done);
  });

  it("should throw error if could not find the correct file extension", done => {
    const fileSystem = new FileSystem({
      files: [`default.json`],
      path: `${__dirname}${configbasePath}specific`,
      format: "micke"
    });

    fileSystem.get().should.be.rejected.and.notify(done);
  });

  it("should load the default file synchronously", done => {
    const filesystem = new FileSystem({
      env: "default",
      region: "default",
      path: `${__dirname}${configbasePath}defaults`,
      files: [`default.json`],
      format: "json"
    });

    const results = [
      {
        version: "v1",
        bestshow: {
          name: "futurama",
          episode: 111
        },
        bestartist: {
          name: "dralban",
          songs: ["it is my life", "hello africa"]
        }
      }
    ];

    expect(filesystem.getSync()).to.eql(results);
    done();
  });
});

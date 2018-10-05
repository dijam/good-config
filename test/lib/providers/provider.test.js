const Provider = require("../../../lib/providers/provider");
const yaml = require("yamljs");

describe("Provider", () => {
  describe("#constructor", () => {
    it("should set default values", () => {
      const options = {
        format: "test",
        files: ["file1", "file2"]
      };
      const provider = new Provider(options);

      expect(provider).to.have.property("path");
      expect(provider.path).to.be.equal("./config");
      expect(provider).to.have.property("fileExtension");
      expect(provider.fileExtension).to.be.equal(options.format);
      expect(provider).to.have.property("files");
      expect(provider.files).to.be.equal(options.files);
    });
  });

  describe("#loadConfig", () => {
    it("should always rejects", done => {
      const options = {
        format: "test",
        files: ["file1", "file2"]
      };
      const provider = new Provider(options);

      provider.loadConfig().should.be.rejected.and.notify(done);
    });
  });

  describe("#parseFile", () => {
    it("should parse json if fileExtension was json", () => {
      const options = {
        format: "json",
        files: ["file1", "file2"]
      };
      const fileData = {
        zoidberg: "test",
        planet: "wutt"
      };
      const jsonData = JSON.stringify(fileData);
      const provider = new Provider(options);

      expect(provider.parseFile(jsonData)).to.be.eql(fileData);
    });

    it("should parse yaml if fileExtension was yml", () => {
      const options = {
        format: "yml",
        files: ["file1", "file2"]
      };
      const fileData = {
        zoidberg: "test",
        planet: "wutt"
      };
      const yamlData = yaml.stringify(fileData);
      const provider = new Provider(options);

      expect(provider.parseFile(yamlData)).to.be.eql(fileData);
    });

    it("should return original format if format was not supported", () => {
      const options = {
        format: "mick",
        files: ["file1", "file2"]
      };
      const fileData = {
        zoidberg: "test",
        planet: "wutt"
      };
      const yamlData = yaml.stringify(fileData);
      const provider = new Provider(options);

      expect(provider.parseFile(yamlData)).to.be.eql(yamlData);
    });
  });

  describe("#get", () => {
    it("should reject if no file has been specified", done => {
      const options = {
        format: "test"
      };
      const provider = new Provider(options);

      provider.get().should.be.rejected.and.notify(done);
    });
  });
});

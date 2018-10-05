const storage = require("../../lib/storage");

describe("config storage", () => {
  describe("#getProviderFromString", () => {
    it("should return undefined if wrong provider requested", () => {
      expect(storage.getProviderFromString("Zoidberg")).to.be.null;
    });
  });

  describe("#load", () => {
    it("should reject for unsupported provider", done => {
      const options = {
        provider: "Zoidberg"
      };

      storage.load(options).should.be.rejected.and.notify(done);
    });
  });

  describe("#loadSync", () => {
    it("should reject for unsupported provider", done => {
      const options = {
        provider: "Zoidberg"
      };

      try {
        storage.loadSync(options);
        done(new Error("Did not expect to get here"));
      } catch (x) {
        done();
      }
    });
  });
});

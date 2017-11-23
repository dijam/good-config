
const storage = require('../../lib/storage');
const FileSystem = require('../../lib/providers/filesystem');

describe('config storage', () => {
  describe('#getProviderFromString', () => {
    it('should return undefined if wrong provider requested', () => {
      const Zoidberg = storage.getProviderFromString('Zoidberg');
      expect(Zoidberg).to.be.null;
    });
  });


  describe('#load', () => {
    it('should reject for unsupported provider', (done) => {
      const options = {
        provider: 'Zoidberg',
      };

      storage.load(options).should.be.rejected.and.notify(done);
    });
  });

  describe('#loadSync', () => {
    it('should reject for unsupported provider', (done) => {
      const options = {
        provider: 'Zoidberg',
      };

      try {
        storage.loadSync(options);
        done(new Error('Did not expect to get here'));
      }
      catch(x) {
        done();
      }
    });
  });
});

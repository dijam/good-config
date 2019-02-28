const S3 = require("../../../lib/providers/s3");
const AWS = require("aws-sdk");

describe("S3", () => {
  describe("#constructor", () => {
    it("should set correct default values", () => {
      const options = {
        awsBucket: "pretty-bucket",
        awsAccessKeyId: "awsAccessKeyId",
        awsSecretAccessKey: "awsSecretAccessKey"
      };
      const s3 = new S3(options);

      expect(s3).to.have.property("bucket");
      expect(s3.bucket).to.be.equal(options.awsBucket);
      expect(s3)
        .to.have.property("s3SDK")
        .instanceof(AWS.S3);
    });
  });

  describe("#loadConfig", () => {
    it("should return correct data from s3", done => {
      const options = {
        awsBucket: "pretty-bucket",
        awsAccessKeyId: "awsAccessKeyId",
        awsSecretAccessKey: "awsSecretAccessKey",
        format: "json"
      };
      const fileData = {
        zoidberg: "test",
        planet: "wutt"
      };
      const jsonData = JSON.stringify(fileData);

      const s3 = new S3(options);
      s3.s3SDK = {
        getObject: () => ({
          promise: sinon.stub().resolves({
            Body: {
              toString: sinon.stub().returns(jsonData)
            }
          })
        })
      };

      expect(s3.loadConfig())
        .to.eventually.eql(fileData)
        .notify(done);
    });

    it("should throw error if s3 returns error", done => {
      const options = {
        awsBucket: "pretty-bucket",
        awsAccessKeyId: "awsAccessKeyId",
        awsSecretAccessKey: "awsSecretAccessKey",
        format: "json"
      };

      const s3 = new S3(options);
      s3.s3SDK = {
        getObject: () => ({
          promise: sinon.stub().rejects(new Error("Failed something"))
        })
      };

      s3.loadConfig().should.be.rejected.and.notify(done);
    });

    it("should throw error if trying to load s3 synchronously", () => {
      const options = {
        awsBucket: "pretty-bucket",
        awsAccessKeyId: "awsAccessKeyId",
        awsSecretAccessKey: "awsSecretAccessKey",
        format: "json"
      };

      const s3 = new S3(options);

      expect(s3.loadConfigSync).to.throw("No provider has been selected or provider does not implement loadConfigSync().");
    });
  });
});

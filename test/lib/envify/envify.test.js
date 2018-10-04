/* global before, describe, it, beforeEach, afterEach  */

const { assert, expect } = require("chai");
const { envify, typeify, upperUnderscore } = require("../../../lib/envify");

describe("Envify tests", () => {
  describe("#upperUnderscore", () => {
    it("should return text uppercased with _ instead of dot", () => {
      expect(upperUnderscore("tests.are.going.well")).be.equal(
        "TESTS_ARE_GOING_WELL"
      );
    });

    it("should return text uppercased with _ instead of dot when the text contains _", () => {
      expect(upperUnderscore("envify_tests.are.going.well")).be.equal(
        "ENVIFY_TESTS_ARE_GOING_WELL"
      );
    });

    it("should return text uppercased with _ instead of dot when the text contains camelCase", () => {
      expect(upperUnderscore("envifyTests.are.going.well")).be.equal(
        "ENVIFYTESTS_ARE_GOING_WELL"
      );
    });
  });

  describe("#typeify", () => {
    it("should return string if original type was string", () => {
      expect(typeify("stringValue", "originalValue")).be.equal("stringValue");
    });

    it("should return number if original type was number", () => {
      expect(typeify("2132", 453)).be.equal(2132);
    });

    it("should return boolean if original type was boolean", () => {
      expect(typeify("false", true)).be.false;
    });
  });

  describe("#envify", () => {
    it("should overright if similar key existed in the env variables", () => {
      process.env.MOON_SIDE = "light";
      const input = {
        sky: "blue",
        temp: [12, 14, 6],
        moon: {
          side: "dark",
          friend: {
            name: "earth"
          }
        }
      };

      const output = {
        sky: "blue",
        temp: [12, 14, 6],
        moon: {
          side: "light",
          friend: {
            name: "earth"
          }
        }
      };
      expect(envify(input)).be.eql(output);
      delete process.env.MOON_SIDE;
    });

    it("should overright if similar key existed in the env variables as an array element", () => {
      process.env.TEMP_0 = 10;
      const input = {
        sky: "blue",
        temp: [12, 14, 6],
        moon: {
          side: "dark",
          friend: {
            name: "earth"
          }
        }
      };

      const output = {
        sky: "blue",
        temp: [10, 14, 6],
        moon: {
          side: "dark",
          friend: {
            name: "earth"
          }
        }
      };
      expect(envify(input)).be.eql(output);
      delete process.env.TEMP_0;
    });

    it("should overright if some of keys in array were empty or non-number", () => {
      process.env.TEMP_0 = "1";
      process.env.TEMP_1 = "";
      process.env.TEMP_2 = "";
      const input = {
        sky: "blue",
        temp: [12, 14, 6],
        moon: {
          side: "dark",
          friend: {
            name: "earth"
          }
        }
      };

      const output = {
        sky: "blue",
        temp: [1, null, null],
        moon: {
          side: "dark",
          friend: {
            name: "earth"
          }
        }
      };
      expect(envify(input)).be.eql(output);
      delete process.env.TEMP_0;
      delete process.env.TEMP_1;
      delete process.env.TEMP_2;
    });

    it("should overright if similar key existed in the env variables with the correct type", () => {
      process.env.ENABLED = "false";
      const input = {
        sky: "blue",
        temp: [12, 14, 6],
        enabled: true,
        moon: {
          side: "dark",
          friend: {
            name: "earth"
          }
        }
      };

      const output = {
        sky: "blue",
        temp: [12, 14, 6],
        enabled: false,
        moon: {
          side: "dark",
          friend: {
            name: "earth"
          }
        }
      };
      expect(envify(input)).be.eql(output);
      delete process.env.ENABLED;
    });

    it("should return empty if it received an empty object", () => {
      process.env.MOON_SIDE = "light";
      expect(envify({})).be.eql({});
      delete process.env.MOON_SIDE;
    });

    it("should throw error if input data is not object", () => {
      const input = "test";
      const output = () => {
        envify(input);
      };
      expect(output).to.throw();
    });
  });
});

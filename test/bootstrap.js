// Chai setup
const chai = require('chai');
const chaiSubset = require('chai-subset');
const chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

chai.use(chaiSubset);
global.expect = chai.expect;


// Sinon setup
const sinon = require('sinon');
require('sinon-as-promised');

global.sinon = sinon;

chai.should();

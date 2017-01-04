'use strict';

var expect = require('chai').expect;
var Variable = require('../app/scripts/variable');

describe('variable', function () {

  it('should initialize with unmodified name', function () {
    var variable = new Variable({
      name: 'g'
    });
    expect(variable).to.have.property('name', 'g');
  });

  it('should serialize to a JSON object', function () {
    var variable = new Variable({
      name: 'h'
    });
    expect(variable.serialize()).to.deep.equal({
      name: 'h'
    });
  });

});

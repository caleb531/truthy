var expect = require('chai').expect;
var Variable = require('../app/scripts/models/variable');

describe('variable', function () {

  it('should initialize with unmodified name', function () {
    var variable = new Variable({
      name: 'g'
    });
    expect(variable).to.have.property('name', 'g');
  });

  it('should serialize to a JSON object', function () {
    var serializedVariable = {name: 'h'};
    var variable = new Variable(serializedVariable);
    expect(variable.serialize()).to.deep.equal(serializedVariable);
  });

});

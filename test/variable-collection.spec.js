'use strict';

var expect = require('chai').expect;
var VariableCollection = require('../app/scripts/variable-collection');
var Variable = require('../app/scripts/variable');

describe('variable collection', function () {

  it('should initialize with list of variables', function () {
    var variables = new VariableCollection({
      items: [{name: 'u'}, {name: 'v'}]
    });
    expect(variables).to.have.property('items');
    expect(variables.items).to.have.length(2);
    variables.items.forEach(function (variable) {
      expect(variable).to.be.an.instanceof(Variable);
    });
  });

  it('should serialize to a JSON object', function () {
    var variables = new VariableCollection({
      items: [{name: 'u'}, {name: 'v'}]
    });
    expect(variables.serialize()).to.deep.equal({
      items: [{name: 'u'}, {name: 'v'}]
    });
  });

});

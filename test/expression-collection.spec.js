'use strict';

var expect = require('chai').expect;
var ExpressionCollection = require('../app/scripts/expression-collection');
var Expression = require('../app/scripts/expression');

describe('expression collection', function () {

  it('should initialize with list of expressions', function () {
    var expressions = new ExpressionCollection({
      items: [{string: 'a xor b'}, {string: 's nand t'}]
    });
    expect(expressions).to.have.property('items');
    expect(expressions.items).to.have.length(2);
    expressions.items.forEach(function (expression) {
      expect(expression).to.be.an.instanceof(Expression);
    });
  });

  it('should serialize to a JSON object', function () {
    var serializedExpressions = {items: [{string: '!a'}, {string: 's or t'}]};
    var expressions = new ExpressionCollection(serializedExpressions);
    expect(expressions.serialize()).to.deep.equal(serializedExpressions);
  });

});

'use strict';

var expect = require('chai').expect;
var ExpressionCollection = require('../app/scripts/models/expression-collection');
var Expression = require('../app/scripts/models/expression');

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

});

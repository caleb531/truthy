import { expect } from 'chai';
import ExpressionCollection from '../app/scripts/models/expression-collection.js';
import Expression from '../app/scripts/models/expression.js';

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

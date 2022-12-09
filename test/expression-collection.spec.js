import ExpressionCollection from '../scripts/models/expression-collection.js';
import Expression from '../scripts/models/expression.js';

describe('expression collection', function () {

  it('should initialize with list of expressions', function () {
    let expressions = new ExpressionCollection({
      items: [{ string: 'a xor b' }, { string: 's nand t' }]
    });
    expect(expressions).toHaveProperty('items');
    expect(expressions.items).toHaveLength(2);
    expressions.items.forEach(function (expression) {
      expect(expression).toBeInstanceOf(Expression);
    });
  });

});

import ExpressionCollection from '../scripts/models/expression-collection.js';
import Expression from '../scripts/models/expression.js';

describe('expression collection', () => {
  it('should initialize with list of expressions', () => {
    let expressions = new ExpressionCollection({
      items: [{ string: 'a xor b' }, { string: 's nand t' }]
    });
    expect(expressions).toHaveProperty('items');
    expect(expressions.items).toHaveLength(2);
    expressions.items.forEach((expression) => {
      expect(expression).toBeInstanceOf(Expression);
    });
  });
});

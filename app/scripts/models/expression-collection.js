import Collection from './collection.js';
import Expression from './expression.js';

// An ordered sequence of expressions; every expression collection inherits from
// the base Collection model
class ExpressionCollection extends Collection {

  constructor({ items }) {
    super({
      SubCollectionItem: Expression,
      items: items
    });
  }

}

export default ExpressionCollection;

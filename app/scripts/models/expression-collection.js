import Collection from './collection.js';
import Expression from './expression.js';

// An ordered sequence of expressions; every expression collection inherits from
// the base Collection model
function ExpressionCollection(args) {
  Collection.call(this, {
    SubCollectionItem: Expression,
    items: args.items
  });
}
ExpressionCollection.prototype = Object.create(Collection.prototype);

export default ExpressionCollection;

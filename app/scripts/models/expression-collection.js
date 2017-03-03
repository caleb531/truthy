'use strict';

var Collection = require('./collection');
var Expression = require('./expression');

// An ordered sequence of expressions; every expression collection inherits from
// the base Collection model
function ExpressionCollection(args) {
  Collection.call(this, {
    SubCollectionItem: Expression,
    items: args.items
  });
}
ExpressionCollection.prototype = Object.create(Collection.prototype);

module.exports = ExpressionCollection;

'use strict';

var Collection = require('./collection');
var Expression = require('./expression');

function ExpressionCollection(args) {
  Collection.call(this, {
    SubCollectionItem: Expression,
    items: args.items
  });
}
ExpressionCollection.prototype = Object.create(Collection.prototype);

module.exports = ExpressionCollection;

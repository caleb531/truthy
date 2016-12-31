'use strict';

var Collection = require('./collection');
var Expression = require('./expression');

function ExpressionCollection(expressionDicts) {
  Collection.call(this, Expression, expressionDicts);
}
ExpressionCollection.prototype = Object.create(Collection.prototype);

module.exports = ExpressionCollection;

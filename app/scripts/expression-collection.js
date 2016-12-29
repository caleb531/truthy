'use strict';

var m = require('mithril');
var _ = require('underscore');
var Expression = require('./expression');

function ExpressionCollection(args) {
  this.expressions = args.expressions;
}

ExpressionCollection.prototype.forEach = function (callback) {
  return _.forEach(this.expressions, callback);
};
ExpressionCollection.prototype.map = function (callback) {
  return _.map(this.expressions, callback);
};

module.exports = ExpressionCollection;

'use strict';

var m = require('mithril');
var _ = require('underscore');
var Expression = require('./expression');

function ExpressionCollection() {
  this.expressions = [
    new Expression({string: 'not p'}),
    new Expression({string: 'p and q'}),
    new Expression({string: 'p or q'})
  ];
}
ExpressionCollection.prototype.forEach = function (callback) {
  return _.forEach(this.expressions, callback);
};
ExpressionCollection.prototype.map = function (callback) {
  return _.map(this.expressions, callback);
};

ExpressionCollection.Component = {};
ExpressionCollection.Component.view = function (ctrl, app) {
  return m('table#expressions', [
    m('thead', m('tr', app.expressions.map(function (expression) {
      return m('td.expression', m('input', {
        type: 'text',
        value: expression.string
      }));
    })))
  ]);
};

module.exports = ExpressionCollection;

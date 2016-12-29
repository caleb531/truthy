'use strict';

var m = require('mithril');

function ExpressionCollection() {
  this.expressions = [];
}

ExpressionCollection.Component = {};
ExpressionCollection.Component.view = function () {
  return m('table#expressions');
};

module.exports = ExpressionCollection;

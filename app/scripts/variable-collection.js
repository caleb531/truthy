'use strict';

var m = require('mithril');

function VariableCollection() {
  this.variables = [];
}

VariableCollection.Component = {};
VariableCollection.Component.view = function () {
  return m('div#variables');
};

module.exports = VariableCollection;

'use strict';

var m = require('mithril');
var _ = require('underscore');
var Variable = require('./variable');

function VariableCollection() {
  this.variables = [
    new Variable({name: 'p'}),
    new Variable({name: 'q'})
  ];
}
VariableCollection.prototype.forEach = function (callback) {
  return _.forEach(this.variables, callback);
};
VariableCollection.prototype.map = function (callback) {
  return _.map(this.variables, callback);
};

VariableCollection.Component = {};
VariableCollection.Component.view = function (ctrl, app) {
  return m('div#variables', app.variables.map(function (variable) {
    return m('div.variable', m('input', {
      type: 'text',
      value: variable.name
    }));
  }));
};

module.exports = VariableCollection;

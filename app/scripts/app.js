'use strict';

var m = require('mithril');
var VariableCollection = require('./variable-collection');
var ExpressionCollection = require('./expression-collection');
var Table = require('./table');

function App() {
  this.variables = new VariableCollection([
    {name: 'p'},
    {name: 'q'}
  ]);
  this.expressions = new ExpressionCollection([
    {string: 'not p'},
    {string: 'p and q'},
    {string: 'p or q'}
  ]);
}

App.Component = {};

App.Component.controller = function () {
  return {
    app: new App()
  };
};

App.Component.view = function (ctrl) {
  return [
    m('h1', 'Truthy'),
    m('h2', 'Variables'),
    m(VariableCollection.Component, ctrl.app.variables),
    m('h2', 'Table'),
    m(Table.Component, ctrl.app.variables, ctrl.app.expressions),
  ];
};


module.exports = App;

'use strict';

var m = require('mithril');
var VariableCollection = require('./variable-collection');
var ExpressionCollection = require('./expression-collection');

function App() {
  this.variables = new VariableCollection();
  this.expressions = new ExpressionCollection();
}

App.Component = {};

App.Component.controller = function () {
  return {
    app: new App()
  };
};

App.Component.view = function () {
  return [
    m('h1', 'Truthy'),
    m(VariableCollection.Component),
    m(ExpressionCollection.Component),
  ];
};


module.exports = App;

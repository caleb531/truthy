'use strict';

var m = require('mithril');
var Variable = require('./variable');
var Expression = require('./expression');
var Table = require('./table');

function App() {
  this.variables = [
    new Variable({name: 'p'}),
    new Variable({name: 'q'})
  ];
  this.expressions = [
    new Expression({string: 'not p'}),
    new Expression({string: 'p and q'}),
    new Expression({string: 'p or q'})
  ];
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
    m(Variable.Component, ctrl.app),
    m('h2', 'Table'),
    m(Table.Component, ctrl.app),
  ];
};


module.exports = App;

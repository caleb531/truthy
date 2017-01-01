'use strict';

var m = require('mithril');
var VariableCollection = require('./variable-collection');
var ExpressionCollection = require('./expression-collection');
var Table = require('./table');

function App(args) {
  if (args && args.variables) {
    this.variables = new VariableCollection(args.variables);
  } else {
    this.variables = new VariableCollection({
      items: [
        {name: 'p'},
        {name: 'q'}
      ]
    });
  }
  if (args && args.expressions) {
    this.expressions = new ExpressionCollection(args.expressions);
  } else {
    this.expressions = new ExpressionCollection({
      items: [
        {string: 'not p'},
        {string: 'p and q'},
        {string: 'p or q'}
      ]
    });
  }
}

// Serialize the current app state so it can be stored locally
App.prototype.serialize = function () {
  return {
    variables: this.variables.serialize(),
    expressions: this.expressions.serialize()
  };
};

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
    m(Table.Component, ctrl.app.variables.filter(function (variable) {
      return variable.name !== '';
    }), ctrl.app.expressions),
  ];
};


module.exports = App;

'use strict';

var _ = require('underscore');
var VariableCollection = require('./variable-collection');
var ExpressionCollection = require('./expression-collection');

// A singleton representing the core state of the application, including
// variables and expressions
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

// App persistence

// The key to use for storing the app data in localStorage
App.storageKey = 'truthy-v3';
// The time in milliseconds to wait before saving data to localStorage (since
// the last call to app.save())
App.persistenceDelay = 500;

App.prototype.save = _.debounce(function () {
  localStorage.setItem(App.storageKey, JSON.stringify(this.serialize()));
}, App.persistenceDelay);

App.restore = function () {
  var appStr = localStorage.getItem(App.storageKey);
  if (appStr !== null) {
    return new App(JSON.parse(appStr));
  } else {
    return new App();
  }
};

module.exports = App;

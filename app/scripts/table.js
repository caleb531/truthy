// Truth table functions and view
'use strict';

var m = require('mithril');
var _ = require('underscore');
var classNames = require('classnames');

var Table = {};

// Iterate through all possible true/false permutations for the given collection
// of variables
Table.forEachPermutation = function (variables, callback) {
  // The current permitation
  var permutation = {};
  variables.forEach(function (variable) {
    permutation[variable.name] = false;
  });
  var elements = [];
  _.times(Math.pow(2, variables.getLength()), function () {
    elements.push(callback(permutation));
  });
  return elements;
};

// Get the string value of the given boolean for display in the truth table
Table.getBoolStr = function (boolean) {
  if (boolean === true) {
    // Display T for true
    return 'T';
  } else if (boolean === false) {
    // Display F for false
    return 'F';
  } else {
    // Display U for null/undefined values
    return 'U';
  }
};

Table.Component = {};

Table.Component.view = function (ctrl, app) {
  var exprValue = false;
  return m('table#truth-table', [
    m('thead', m('tr', [
      app.variables.map(function (variable) {
        return m('th.variable', variable.name);
      }),
      app.expressions.map(function (expression) {
        return m('th.expression', m('input', {
          type: 'text',
          value: expression.string
        }));
      })
    ])
  ),
  m('tbody', Table.forEachPermutation(app.variables, function (permutation) {
    return m('tr', [
      app.variables.map(function(variable) {
        var varValue = permutation[variable.name];
        return m('td', {
          class: classNames(
            {true: varValue === true},
            {false: varValue === false}
          )
        },
        Table.getBoolStr(varValue));
      }),
      app.expressions.map(function(expressions) {
        exprValue = !exprValue;
        return m('td', {
          class: classNames(
            {true: exprValue === true},
            {false: exprValue === false},
            {und: exprValue === undefined}
          )
        }, Table.getBoolStr(exprValue));
      })
    ]);
  }))
]);
};

module.exports = Table;

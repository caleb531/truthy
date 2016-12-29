// Truth table functions and view
'use strict';

var m = require('mithril');
var _ = require('underscore');
var classNames = require('classnames');

var Table = {};

// Iterate through all possible true/false values for the given collection of
// variables
Table.forEachRow = function (variables, callback) {
  var currentVarValues = {};
  variables.forEach(function (variable) {
    // Variable values should be initialized to true because they will be
    // inverted before the callback is called for the first table row, making
    // the first permutation of variable values all false
    currentVarValues[variable.name] = true;
  });
  var varCount = variables.getLength();
  // If n corresponds to the number of variables, then there will always be 2^n
  // rows in the truth table (excluding the table head, of course)
  return _.times(Math.pow(2, varCount), function (rowIndex) {
    variables.forEach(function (variable, varIndex) {
      // Alternate current variable values as needed
      if (rowIndex % Math.pow(2, varCount - varIndex - 1) === 0) {
        currentVarValues[variable.name] = !currentVarValues[variable.name];
      }
    });
    return callback(currentVarValues);
  });
};

// Get the string value of the given boolean for display in the truth table
Table.getBoolStr = function (boolean) {
  if (boolean === true) {
    return 'T';
  } else if (boolean === false) {
    return 'F';
  } else {
    // Display U for null/undefined values
    return 'U';
  }
};

Table.Component = {};

Table.Component.view = function (ctrl, app) {
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
  m('tbody', Table.forEachRow(app.variables, function (varValues) {
    return m('tr', [
      app.variables.map(function(variable) {
        var varValue = varValues[variable.name];
        return m('td', {
          class: classNames(
            {true: varValue === true},
            {false: varValue === false}
          )
        },
        Table.getBoolStr(varValue));
      }),
      app.expressions.map(function(expression) {
        var exprValue = expression.evaluate(varValues);
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

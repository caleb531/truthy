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
  // If n corresponds to the number of variables, then there will always be 2^n
  // rows in the truth table (excluding the table head, of course)
  return _.times(Math.pow(2, variables.length), function (rowIndex) {
    variables.forEach(function (variable, varIndex) {
      // Alternate current variable values as needed
      if (rowIndex % Math.pow(2, variables.length - varIndex - 1) === 0) {
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

Table.Component.controller = function () {
  return {
    getExpressionIndex: function (expressionElem) {
      var currentElem = expressionElem.parentNode.parentNode;
      var expressionIndex = -1;
      do {
        currentElem = currentElem.previousElementSibling;
        expressionIndex += 1;
      } while (currentElem !== null && currentElem.classList.contains('expression'));
      return expressionIndex;
    },
    updateExpressionString: function (ctrl, expressions, event) {
      var expression = expressions.get(ctrl.getExpressionIndex(event.target));
      expression.string = event.target.value;
    },
    addExpression: function (ctrl, expressions, event) {
      var expressionIndex = ctrl.getExpressionIndex(event.target);
      var expression = expressions.get(expressionIndex);
      expressions.insert(expressionIndex + 1, {
        string: expression.string
      });
      // Redraw the view to ensire the new expression element exists
      m.redraw();
      event.target
        .parentNode
        .parentNode
        .nextElementSibling
        .querySelector('input').focus();
    },
    removeExpression: function (ctrl, expressions, event) {
      expressions.remove(ctrl.getExpressionIndex(event.target));
    },
    handleControls: function (ctrl, expressions, event) {
      if (event.target.classList.contains('control-add')) {
        ctrl.addExpression(ctrl, expressions, event);
      } else if (event.target.classList.contains('control-remove')) {
        ctrl.removeExpression(ctrl, expressions, event);
      }
    }
  };
};

Table.Component.view = function (ctrl, variables, expressions) {
  // A cache to store expressions which are known to be invalid (so as to avoid
  // re-evaluating them later)
  var invalidExpressionCache = {};
  return m('table#truth-table', [
    m('thead', m('tr', {
      onclick: _.partial(ctrl.handleControls, ctrl, expressions),
      oninput: _.partial(ctrl.updateExpressionString, ctrl, expressions)
    }, [
      variables.map(function (variable) {
        return m('th.variable', variable.name);
      }),
      expressions.map(function (expression) {
        return m('th.expression', m('div.has-controls', [
          m('div.control.control-add'),
          m('div.control.control-remove'),
          m('input', {
            type: 'text',
            size: Math.max(1, expression.string.length),
            value: expression.string,
            autocapitalize: 'off',
            autocomplete: 'off',
            autocorrect: 'off',
            spellcheck: false
          })
        ]));
      })
    ])
  ),
  m('tbody', Table.forEachRow(variables, function (varValues) {
    return m('tr', [
      variables.map(function(variable) {
        var varValue = varValues[variable.name];
        return m('td', {
          class: classNames(
            {true: varValue === true},
            {false: varValue === false}
          )
        },
        Table.getBoolStr(varValue));
      }),
      expressions.map(function(expression) {
        var exprValue;
        // Don't re-evaluate expression if it is known to be invalid
        if (expression.string in invalidExpressionCache) {
          exprValue = null;
        } else {
          exprValue = expression.evaluate(varValues);
          if (exprValue === null) {
            // The value stored with the key in the cache doesn't really matter;
            // the cache itself functions more as a set than a dictionary
            invalidExpressionCache[expression.string] = true;
          }
        }
        return m('td', {
          class: classNames(
            {true: exprValue === true},
            {false: exprValue === false}
          )
        }, Table.getBoolStr(exprValue));
      })
    ]);
  }))
]);
};

module.exports = Table;

// Truth table functions and view
'use strict';

var m = require('mithril');
var _ = require('underscore');
var classNames = require('classnames');
var VariableCollection = require('../models/variable-collection');

var TableComponent = {};

TableComponent.controller = function () {
  return {
    // Get the string value of the given boolean for display in the truth table
    getBoolStr: function (boolean) {
      if (boolean === true) {
        return 'T';
      } else if (boolean === false) {
        return 'F';
      } else {
        return '?';
      }
    },
    getExpressionIndex: function (expressionElem) {
      var currentElem = expressionElem.parentNode.parentNode;
      var expressionIndex = -1;
      do {
        currentElem = currentElem.previousElementSibling;
        expressionIndex += 1;
      } while (currentElem !== null && currentElem.classList.contains('expression'));
      return expressionIndex;
    },
    updateExpressionString: function (ctrl, app, event) {
      var expression = app.expressions.get(ctrl.getExpressionIndex(event.target));
      expression.string = event.target.value;
      app.save();
    },
    addExpression: function (ctrl, app, event) {
      var expressionIndex = ctrl.getExpressionIndex(event.target);
      var expression = app.expressions.get(expressionIndex);
      app.expressions.insert(expressionIndex + 1, {
        string: expression.string
      });
      // Redraw the view to ensire the new expression element exists
      m.redraw();
      event.target
        .parentNode
        .parentNode
        .nextElementSibling
        .querySelector('input').focus();
      app.save();
    },
    removeExpression: function (ctrl, app, event) {
      app.expressions.remove(ctrl.getExpressionIndex(event.target));
      app.save();
    },
    handleControls: function (ctrl, app, event) {
      if (event.target.classList.contains('control-add')) {
        ctrl.addExpression(ctrl, app, event);
      } else if (event.target.classList.contains('control-remove')) {
        ctrl.removeExpression(ctrl, app, event);
      } else {
        m.redraw.strategy('none');
      }
    }
  };
};

TableComponent.view = function (ctrl, app) {
  var nonEmptyVariables = new VariableCollection({
    items: app.variables.filter(function (variable) {
      return variable.name !== '';
    })
  });
  // A cache to store expressions which are known to be invalid (so as to avoid
  // re-evaluating them later)
  var invalidExpressionCache = {};
  return m('table#truth-table', [
    m('thead', m('tr', {
      onclick: _.partial(ctrl.handleControls, ctrl, app),
      oninput: _.partial(ctrl.updateExpressionString, ctrl, app)
    }, [
      nonEmptyVariables.map(function (variable) {
        return m('th.variable', variable.name);
      }),
      app.expressions.map(function (expression) {
        return m('th.expression', m('div.has-controls', [
          m('div.control.control-add'),
          app.expressions.length > 1 ? m('div.control.control-remove') : null,
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
  m('tbody', nonEmptyVariables.mapPermutations(function (varValues) {
    return m('tr', [
      nonEmptyVariables.map(function(variable) {
        var varValue = varValues[variable.name];
        return m('td', {
          class: classNames(
            {true: varValue === true},
            {false: varValue === false}
          )
        },
        ctrl.getBoolStr(varValue));
      }),
      app.expressions.map(function(expression) {
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
        }, ctrl.getBoolStr(exprValue));
      })
    ]);
  }))
]);
};

module.exports = TableComponent;

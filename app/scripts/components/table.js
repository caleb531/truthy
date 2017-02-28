// Truth table functions and view
'use strict';

var m = require('mithril');
var classNames = require('classnames');
var VariableCollection = require('../models/variable-collection');

var TableComponent = {};

TableComponent.oninit = function (vnode) {
  var app = vnode.attrs.app;
  var state = vnode.state;
  Object.assign(state, {
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
    updateExpressionString: function (clickEvent) {
      var expression = app.expressions.get(state.getExpressionIndex(clickEvent.target));
      expression.string = clickEvent.target.value;
      app.save();
    },
    addExpression: function (clickEvent) {
      var expressionIndex = state.getExpressionIndex(clickEvent.target);
      var expression = app.expressions.get(expressionIndex);
      app.expressions.insert(expressionIndex + 1, {
        string: expression.string
      });
      // Redraw the view to ensire the new expression element exists
      m.redraw();
      clickEvent.target
        .parentNode
        .parentNode
        .nextElementSibling
        .querySelector('input').focus();
      app.save();
    },
    removeExpression: function (clickEvent) {
      app.expressions.remove(state.getExpressionIndex(clickEvent.target));
      app.save();
    },
    handleControls: function (clickEvent) {
      if (clickEvent.target.classList.contains('control-add')) {
        state.addExpression(clickEvent);
      } else if (clickEvent.target.classList.contains('control-remove')) {
        state.removeExpression(clickEvent);
      } else {
        clickEvent.redraw = false;
      }
    }
  });
};

TableComponent.view = function (vnode) {
  var app = vnode.attrs.app;
  var state = vnode.state;
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
      onclick: state.handleControls,
      oninput: state.updateExpressionString
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
      nonEmptyVariables.map(function (variable) {
        var varValue = varValues[variable.name];
        return m('td', {
          class: classNames(
            {true: varValue === true},
            {false: varValue === false}
          )
        },
        state.getBoolStr(varValue));
      }),
      app.expressions.map(function (expression) {
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
            {false: exprValue === false},
            {invalid: exprValue === null}
          )
        }, state.getBoolStr(exprValue));
      })
    ]);
  }))
]);
};

module.exports = TableComponent;

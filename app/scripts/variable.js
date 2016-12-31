'use strict';

var m = require('mithril');
var _ = require('underscore');

function Variable(args) {
  this.name = args.name;
}
Variable.validNamePattern = /^[A-Za-z]$/;

Variable.Component = {};

Variable.Component.controller = function () {
  return {
    getVariableIndex: function (variableElem) {
      var currentElem = variableElem.parentNode.parentNode;
      var variableIndex = -1;
      do {
        currentElem = currentElem.previousElementSibling;
        variableIndex += 1;
      } while (currentElem !== null && currentElem.className === 'variable');
      return variableIndex;
    },
    updateVariableName: function (ctrl, app, event) {
      var variableIndex = ctrl.getVariableIndex(event.target);
      if (Variable.validNamePattern.test(event.target.value)) {
        app.variables[variableIndex].name = event.target.value;
      }
    },
    // Get the next available variable name for a new variable (to insert next
    // to the given variable)
    getNextVariableName: function (variables, variable) {
      // Create a list of variable names already in use
      var variableCharCodes = _.map(variables, function (variable) {
        return variable.name.charCodeAt(0);
      });
      // Look for the next letter that isn't already in use
      var nextVarCharCode = variable.name.charCodeAt(0);
      do {
        nextVarCharCode += 1;
      } while (variableCharCodes.indexOf(nextVarCharCode) !== -1);
      // Wrap variable name around alphabet if necessary (e.g. 'z' wraps around
      // to 'z')
      if (nextVarCharCode === 91 || nextVarCharCode === 123) {
        nextVarCharCode = nextVarCharCode - 26;
      }
      return String.fromCharCode(nextVarCharCode);
    },
    // Add variable next to variable whose add control was pressed
    addVariable: function (ctrl, app, event) {
      var variableIndex = ctrl.getVariableIndex(event.target);
      var variable = app.variables[variableIndex];
      app.variables.splice(variableIndex + 1, 0, new Variable({
        name: ctrl.getNextVariableName(app.variables, variable)
      }));
    },
    handleClick: function (ctrl, app, event) {
      if (event.target.nodeName === 'INPUT') {
        // Focus variable input if input is clicked
        event.target.select();
      } else if (event.target.className.indexOf('add') !== -1) {
        // Add variable if 'add' control is clicked
        ctrl.addVariable(ctrl, app, event);
      }
    }
  };
};

Variable.Component.view = function (ctrl, app) {
  return m('div#variables', {
    onclick: _.partial(ctrl.handleClick, ctrl, app),
    oninput: _.partial(ctrl.updateVariableName, ctrl, app)
  }, _.map(app.variables, function (variable) {
    return m('div.variable', m('div.has-controls', [
      m('div.control.add'),
      m('div.control.remove'),
      m('input', {
        type: 'text',
        value: variable.name,
        maxlength: 1,
        autocapitalize: 'off',
        autocomplete: 'off',
        autocorrect: 'off',
        spellcheck: false
      })
    ]));
  }));
};

module.exports = Variable;

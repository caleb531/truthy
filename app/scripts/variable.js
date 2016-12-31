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
      var variableInputs = variableElem
        .parentNode
        .parentNode
        .getElementsByClassName('variable');
      var variableIndex = Array.prototype.indexOf.call(variableInputs, variableElem.parentNode);
      return variableIndex;
    },
    updateVariableName: function (ctrl, app, event) {
      var variableIndex = ctrl.getVariableIndex(event.target);
      if (Variable.validNamePattern.test(event.target.value)) {
        app.variables[variableIndex].name = event.target.value;
      }
    },
    focusVariableInput: function (event) {
      if (event.target.nodeName === 'INPUT') {
        event.target.select();
      }
    }
  };
};

Variable.Component.view = function (ctrl, app) {
  return m('div#variables', {
    onclick: ctrl.focusVariableInput,
    oninput: _.partial(ctrl.updateVariableName, ctrl, app)
  }, _.map(app.variables, function (variable) {
    return m('div.variable', m('input', {
      type: 'text',
      value: variable.name,
      maxlength: 1,
      autocapitalize: 'off',
      autocomplete: 'off',
      autocorrect: 'off',
      spellcheck: false
    }));
  }));
};

module.exports = Variable;

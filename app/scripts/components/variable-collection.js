'use strict';

var m = require('mithril');
var _ = require('underscore');

var VariableCollectionComponent = {};

VariableCollectionComponent.controller = function () {
  return {
    validNamePattern: /^[A-Za-z]$/,
    getVariableIndex: function (variableElem) {
      var currentElem = variableElem.parentNode.parentNode;
      var variableIndex = -1;
      do {
        currentElem = currentElem.previousElementSibling;
        variableIndex += 1;
      } while (currentElem !== null && currentElem.classList.contains('variable'));
      return variableIndex;
    },
    updateVariableName: function (ctrl, app, event) {
      if (ctrl.validNamePattern.test(event.target.value) || event.target.value === '') {
        var variable = app.variables.get(ctrl.getVariableIndex(event.target));
        variable.name = event.target.value;
        app.save();
      }
    },
    addVariable: function (ctrl, app, event) {
      var variableIndex = ctrl.getVariableIndex(event.target);
      var variable = app.variables.get(variableIndex);
      app.variables.insert(variableIndex + 1, {
        name: app.variables.getNextVariableName(variable)
      });
      m.redraw();
      event.target
        .parentNode
        .parentNode
        .nextElementSibling
        .querySelector('input').focus();
      app.save();
    },
    removeVariable: function (ctrl, app, event) {
      app.variables.remove(ctrl.getVariableIndex(event.target));
      app.save();
    },
    handleControls: function (ctrl, app, event) {
      if (event.target.classList.contains('control-add')) {
        ctrl.addVariable(ctrl, app, event);
      } else if (event.target.classList.contains('control-remove')) {
        ctrl.removeVariable(ctrl, app, event);
      } else {
        m.redraw.strategy('none');
      }
    }
  };
};

VariableCollectionComponent.view = function (ctrl, app) {
  return m('div#variables', {
    onclick: _.partial(ctrl.handleControls, ctrl, app),
    oninput: _.partial(ctrl.updateVariableName, ctrl, app)
  }, app.variables.map(function (variable) {
    return m('div.variable', m('div.has-controls', [
      m('div.control.control-add'),
      app.variables.length > 1 ? m('div.control.control-remove') : null,
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

module.exports = VariableCollectionComponent;

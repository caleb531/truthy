'use strict';

var m = require('mithril');

var VariableCollectionComponent = {};

VariableCollectionComponent.oninit = function (vnode) {
  var app = vnode.attrs.app;
  var state = vnode.state;
  Object.assign(state, {
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
    updateVariableName: function (event) {
      // Only update variable name if name is syntactically valid and if name is
      // not already in use
      if (event.target.value === '' || (state.validNamePattern.test(event.target.value) && app.variables.checkNameAvailability(event.target.value))) {
        var variable = app.variables.get(state.getVariableIndex(event.target));
        variable.name = event.target.value;
        app.save();
      }
    },
    addVariable: function (event) {
      var variableIndex = state.getVariableIndex(event.target);
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
    removeVariable: function (event) {
      app.variables.remove(state.getVariableIndex(event.target));
      app.save();
    },
    handleControls: function (event) {
      if (event.target.classList.contains('control-add')) {
        state.addVariable(event);
      } else if (event.target.classList.contains('control-remove')) {
        state.removeVariable(event);
      } else {
        event.redraw = false;
      }
    }
  });
};

VariableCollectionComponent.view = function (vnode) {
  var app = vnode.attrs.app;
  var state = vnode.state;
  return m('div#variables', {
    onclick: state.handleControls,
    oninput: state.updateVariableName
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

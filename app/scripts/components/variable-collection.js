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
    updateVariableName: function (clickEvent) {
      // Only update variable name if name is syntactically valid and if name is
      // not already in use
      if (clickEvent.target.value === '' || (state.validNamePattern.test(clickEvent.target.value) && app.variables.checkNameAvailability(clickEvent.target.value))) {
        var variable = app.variables.get(state.getVariableIndex(clickEvent.target));
        variable.name = clickEvent.target.value;
        app.save();
      }
    },
    addVariable: function (clickEvent) {
      var variableIndex = state.getVariableIndex(clickEvent.target);
      var variable = app.variables.get(variableIndex);
      app.variables.insert(variableIndex + 1, {
        name: app.variables.getNextVariableName(variable)
      });
      m.redraw();
      clickEvent.target
        .parentNode
        .parentNode
        .nextElementSibling
        .querySelector('input').focus();
      app.save();
    },
    removeVariable: function (clickEvent) {
      app.variables.remove(state.getVariableIndex(clickEvent.target));
      app.save();
    },
    handleControls: function (clickEvent) {
      if (clickEvent.target.classList.contains('control-add')) {
        state.addVariable(clickEvent);
      } else if (clickEvent.target.classList.contains('control-remove')) {
        state.removeVariable(clickEvent);
      } else {
        clickEvent.redraw = false;
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

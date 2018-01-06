import _ from 'underscore';
import m from 'mithril';

// The variable collection UI that displays all variables available to the truth
// table
var VariableCollectionComponent = {};

VariableCollectionComponent.oninit = function (vnode) {
  var app = vnode.attrs.app;
  var state = vnode.state;
  _.extend(state, {
    validNamePattern: /^[A-Za-z]$/,
    getVariableIndex: function (buttonElem) {
      var variableElem = buttonElem.parentNode.parentNode;
      return Number(variableElem.getAttribute('data-index'));
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
      var newVariableName = app.variables.getNextVariableName(variable);
      app.variables.insert(variableIndex + 1, {
        name: newVariableName
      });
      app.save();
      state.lastCreatedVariableIndex = variableIndex + 1;
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
      }
    },
    focusNewVariable: function (inputVnode) {
      if (state.lastCreatedVariableIndex === inputVnode.attrs['data-index']) {
        inputVnode.dom.focus();
        state.lastCreatedVariableIndex = null;
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
  }, app.variables.map(function (variable, v) {
    return m('div.variable', {'data-index': v}, m('div.has-controls', [
      m('div.control.control-add'),
      app.variables.length > 1 ? m('div.control.control-remove') : null,
      m('input', {
        type: 'text',
        value: variable.name,
        maxlength: 1,
        autocapitalize: 'off',
        autocomplete: 'off',
        autocorrect: 'off',
        spellcheck: false,
        oncreate: state.focusNewVariable,
        onupdate: state.focusNewVariable,
        'data-index': v
      })
    ]));
  }));
};

export default VariableCollectionComponent;

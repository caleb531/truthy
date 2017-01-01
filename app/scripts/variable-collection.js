'use strict';

var m = require('mithril');
var _ = require('underscore');
var Collection = require('./collection');
var Variable = require('./variable');

function VariableCollection(args) {
  Collection.call(this, Variable, args.items);
}
VariableCollection.prototype = Object.create(Collection.prototype);

VariableCollection.prototype.serialize = function () {
  return {
    items: this.items.map(function (variable) {
      return variable.serialize();
    })
  };
};

// Get the next available variable name for a new variable (to insert next to
// the given variable)
VariableCollection.prototype.getNextVariableName = function (variable) {
  // Create a list of variable names already in use
  var variableCharCodes = this.map(function (variable) {
    return variable.name.charCodeAt(0);
  });
  // Look for the next letter that isn't already in use
  var nextVarCharCode = variable.name.charCodeAt(0);
  do {
    nextVarCharCode += 1;
    // Wrap variable name around alphabet if necessary (e.g. 'z' wraps around to
    // 'z')
    if (nextVarCharCode === 91 || nextVarCharCode === 123) {
      nextVarCharCode = nextVarCharCode - 26;
    }
  } while (variableCharCodes.indexOf(nextVarCharCode) !== -1);
  return String.fromCharCode(nextVarCharCode);
};

VariableCollection.Component = {};

VariableCollection.Component.controller = function () {
  return {
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
      if (Variable.validNamePattern.test(event.target.value) || event.target.value === '') {
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
      }
    }
  };
};

VariableCollection.Component.view = function (ctrl, app) {
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

module.exports = VariableCollection;

'use strict';

var m = require('mithril');
var _ = require('underscore');

function Variable(args) {
  this.name = args.name;
}

Variable.Component = {};

Variable.Component.view = function (ctrl, app) {
  return m('div#variables', _.map(app.variables, function (variable) {
    return m('div.variable', m('input', {
      type: 'text',
      value: variable.name,
      maxlength: 1
    }));
  }));
};

module.exports = Variable;

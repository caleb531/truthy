'use strict';

var m = require('mithril');
var _ = require('underscore');
var classNames = require('classnames');

var Reference = {};

// Reference data for all operations supported by Truthy
Reference.operations = [
  {
    name: 'NOT',
    examples: ['not p', '!p']
  },
  {
    name: 'AND',
    examples: ['p and q', 'p & q']
  },
  {
    name: 'OR',
    examples: ['p or q', 'p | q']
  },
  {
    name: 'XOR',
    examples: ['p xor q', 'p ^ q']
  },
  {
    name: 'NOR',
    examples: ['p nor q']
  },
  {
    name: 'NAND',
    examples: ['p nand q']
  },
  {
    name: 'Implication',
    examples: ['p -> q']
  },
  {
    name: 'Double-Implication (XNOR)',
    examples: ['p <-> q', 'p xnor q']
  }
];

Reference.Component = {};

Reference.Component.controller = function () {
  return {
    // View the pressed example on the app truth table
    viewExample: function (ctrl, app, event) {
      // If example is clicked, add it to expression list
      if (event.target.classList.contains('operation-example')) {
        app.expressions.add({
          string: event.target.textContent
        });
        app.save();
        // Close reference sidebar
        location.hash = '#';
      }
    }
  };
};

Reference.Component.view = function (ctrl, app) {
  return m('div#reference-sidebar', {
    class: classNames({'reference-open': location.hash === '#reference'}),
    onclick: _.partial(ctrl.viewExample, ctrl, app)
  }, [
    m('a[href=#].reference-close-link', {onclick: m.redraw}, m('img', {
      src: 'icons/close.svg',
      alt: 'Close'
    })),
    m('h2', 'Truthy Reference'),
    Reference.operations.map(function (operation) {
      return m('div.operation', [
        m('h3', operation.name),
        operation.examples.map(function (example) {
          return m('pre.operation-example', example);
        })
      ]);
    })
  ]);
};

module.exports = Reference;

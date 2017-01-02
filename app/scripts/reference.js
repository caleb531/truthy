'use strict';

var m = require('mithril');
var classNames = require('classnames');

var Reference = {};

// Reference data for all operations supported by Truthy
Reference.operations = [
  {
    name: 'NOT',
    syntaxes: ['not p', '!p']
  },
  {
    name: 'AND',
    syntaxes: ['p and q', 'p & q']
  },
  {
    name: 'OR',
    syntaxes: ['p or q', 'p | q']
  },
  {
    name: 'XOR',
    syntaxes: ['p xor q', 'p ^ q']
  },
  {
    name: 'NOR',
    syntaxes: ['p nor q']
  },
  {
    name: 'NAND',
    syntaxes: ['p nand q']
  },
  {
    name: 'Implication',
    syntaxes: ['p -> q']
  },
  {
    name: 'Double-Implication (XNOR)',
    syntaxes: ['p <-> q', 'p xnor q']
  }
];

Reference.Component = {};

Reference.Component.view = function () {
  return m('div#reference', {
    class: classNames({'reference-open': location.hash === '#reference'})
  }, [
    m('a[href=#].reference-close-link', {onclick: m.redraw}, m('img', {
      src: 'icons/close.svg',
      alt: 'Close'
    })),
    m('h2', 'Truthy Reference'),
    Reference.operations.map(function (operation) {
      return m('div.operation', [
        m('h3', operation.name),
        operation.syntaxes.map(function (syntax) {
          return m('pre.operation-syntax', syntax);
        })
      ]);
    })
  ]);
};

module.exports = Reference;

'use strict';

var m = require('mithril');
var classNames = require('classnames');

var Reference = {};

// Reference data for all operations supported by Truthy
Reference.features = [
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
    name: 'Parentheses',
    examples: ['(p & q) | (p & r)']
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

Reference.Component.view = function () {
  return m('div#reference-sidebar', {
    class: classNames({'reference-open': location.hash === '#reference'})
  }, [
    m('a[href=#].reference-close-link', {onclick: m.redraw}, m('img', {
      src: 'icons/close.svg',
      alt: 'Close'
    })),
    m('h2', 'Truthy Reference'),
    Reference.features.map(function (feature) {
      return m('div.feature', [
        m('h3', feature.name),
        feature.examples.map(function (example) {
          return m('pre.feature-example', example);
        })
      ]);
    })
  ]);
};

module.exports = Reference;

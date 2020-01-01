import m from 'mithril';
import classNames from '../classnames.js';

// The application reference sidebar (listing supported syntax/operations)
class ReferenceComponent {

  view(vnode) {
    return m('div#reference.reference-close-control', {
      class: classNames(
        { 'reference-is-open': vnode.attrs.referenceIsOpen }
      )
    }, m('#reference-sidebar.scrollable-container', [
        m('img.reference-close-control', {
          src: 'icons/close.svg',
          alt: 'Close'
        }),
        m('h2', 'App Reference'),
        ReferenceComponent.features.map((feature) => {
          return m('div.feature', [
            m('h3', feature.name),
            feature.examples.map((example) => {
              return m('pre.feature-example', example);
            })
          ]);
        })
      ])
    );
  }

}

// Reference data for all operations supported by Truthy
ReferenceComponent.features = [
  {
    name: 'NOT',
    examples: ['not p', '!p']
  },
  {
    name: 'AND',
    examples: ['p and q', 'p & q', 'p && q']
  },
  {
    name: 'OR',
    examples: ['p or q', 'p | q', 'p || q']
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

export default ReferenceComponent;

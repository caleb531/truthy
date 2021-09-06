import m from 'mithril';
import classNames from '../classnames.js';

// The application reference sidebar (listing supported syntax/operations)
class ReferenceComponent {

  // Insert the clicked example into your expression table
  tryExample(clickEvent, app) {
    const exampleVariableNames = ['p', 'q', 'r'];
    if (clickEvent.target.classList.contains('feature-example')) {
      let exampleExpressionString = clickEvent.target.innerText;
      // If the user does not have enough variables defined, add the relevant
      // variables
      exampleVariableNames.forEach((exampleVariableName, i) => {
        if (exampleExpressionString.indexOf(exampleVariableName) !== -1 && app.variables.length < (i + 1)) {
          let lastVariable = app.variables.get(app.variables.length - 1);
          app.variables.insert(app.variables.length, {
            name: app.variables.getNextVariableName(lastVariable)
          });
        }
      });
      // Replace example variable names with the names of the user's
      // currently-defined variables
      app.variables.forEach((variable, i) => {
        exampleExpressionString = exampleExpressionString.replace(
          new RegExp(`\\b${exampleVariableNames[i]}\\b`, 'gi'),
          variable.name
        );
      });
      // Insert modified example into user's expression table
      app.expressions.insert(app.expressions.length, {
        string: exampleExpressionString
      });
      app.save();
    }
  }

  view({ attrs: { app, referenceIsOpen } }) {
    return m('div#reference.reference-close-control', {
      class: classNames(
        { 'reference-is-open': referenceIsOpen }
      )
    }, m('#reference-sidebar.scrollable-container', {
      onclick: (clickEvent) => this.tryExample(clickEvent, app)
    }, [
        m('img.reference-close-control', {
          src: 'icons/close.svg',
          alt: 'Close'
        }),
        m('h2', 'App Reference'),
        m('p.cta', 'Click any example to try it!'),
        ReferenceComponent.features.map((feature) => {
          return m('div.feature', [
            m('h3', feature.name),
            feature.examples.map((example) => {
              return m('pre.feature-example.reference-close-control', example);
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
    examples: ['p and q', 'p & q', 'p && q', 'p * q']
  },
  {
    name: 'OR',
    examples: ['p or q', 'p | q', 'p || q', 'p + q']
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

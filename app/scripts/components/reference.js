import m from 'mithril';
import classNames from '../classnames.js';

// The application reference sidebar (listing supported syntax/operations)
class ReferenceComponent {

  // Insert the clicked example into your expression table
  tryExample(clickEvent, app) {
    if (clickEvent.target.classList.contains('feature-example')) {
      let exampleExpressionString = clickEvent.target.innerText;
      // If the user does not have enough variables defined, add one (none of
      // the examples use any more than two variables)
      if (exampleExpressionString.indexOf('q') !== -1 && app.variables.length < 2) {
        let lastVariable = app.variables.get(app.variables.length - 1);
        app.variables.insert(app.variables.length, {
          name: app.variables.getNextVariableName(lastVariable)
        });
      }
      // Replace example 'p' and 'q' variable names with the names of the user's
      // currently-defined variables
      exampleExpressionString = exampleExpressionString.replace(/p/gi, app.variables.get(0).name);
      if (app.variables.length > 1) {
        exampleExpressionString = exampleExpressionString.replace(/q/gi, app.variables.get(1).name);
      }
      // Insert modified example into user's expression table
      app.expressions.insert(app.expressions.length, {
        string: exampleExpressionString
      });
    } else {
      clickEvent.redraw = false;
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

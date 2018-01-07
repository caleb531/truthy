import m from 'mithril';
import classNames from 'classnames';

// The truth table UI, including all created expressions and their table values
class TableComponent {

  oninit(vnode) {
    this.app = vnode.attrs.app;
  }

  // Get the string value of the given boolean for display in the truth table
  getBoolStr(boolean) {
    if (boolean === true) {
      return 'T';
    } else if (boolean === false) {
      return 'F';
    } else {
      return '?';
    }
  }

  getExpressionIndex(buttonElem) {
    let expressionElem = buttonElem.parentNode.parentNode;
    return Number(expressionElem.getAttribute('data-index'));
  }

  updateExpressionString(clickEvent) {
    let expression = this.app.expressions.get(this.getExpressionIndex(clickEvent.target));
    expression.string = clickEvent.target.value;
    this.app.save();
  }

  addExpression(clickEvent) {
    let expressionIndex = this.getExpressionIndex(clickEvent.target);
    let expression = this.app.expressions.get(expressionIndex);
    this.app.expressions.insert(expressionIndex + 1, {
      string: expression.string
    });
    this.app.save();
    this.lastCreatedExpressionIndex = expressionIndex + 1;
  }

  removeExpression(clickEvent) {
    this.app.expressions.remove(this.getExpressionIndex(clickEvent.target));
    this.app.save();
  }

  handleControls(clickEvent) {
    if (clickEvent.target.classList.contains('control-add')) {
      this.addExpression(clickEvent);
    } else if (clickEvent.target.classList.contains('control-remove')) {
      this.removeExpression(clickEvent);
    }
  }

  focusNewExpression(inputVnode) {
    if (this.lastCreatedExpressionIndex === inputVnode.attrs['data-index']) {
      inputVnode.dom.focus();
      this.lastCreatedExpressionIndex = null;
    }
  }

  view() {
    // A cache to store expressions which are known to be invalid (so as to avoid
    // re-evaluating them later)
    let invalidExpressionCache = {};
    return m('table#truth-table', [
      m('thead', m('tr', {
        onclick: (clickEvent) => this.handleControls(clickEvent),
        oninput: (inputEvent) => this.updateExpressionString(inputEvent)
      }, [
        this.app.variables.map((variable) => {
          return m('th.variable', variable.name ? variable.name : '?');
        }),
        this.app.expressions.map((expression, e) => {
          return m('th.expression', {'data-index': e}, m('div.has-controls', [
            m('div.control.control-add'),
            this.app.expressions.length > 1 ? m('div.control.control-remove') : null,
            m('input', {
              type: 'text',
              size: Math.max(1, expression.string.length),
              value: expression.string,
              autocapitalize: 'off',
              autocomplete: 'off',
              autocorrect: 'off',
              spellcheck: false,
              oncreate: (vnode) => this.focusNewExpression(vnode),
              onupdate: (vnode) => this.focusNewExpression(vnode),
              'data-index': e
            })
          ]));
        })
      ])),
      m('tbody', this.app.variables.mapPermutations((varValues) => {
        return m('tr', [
          this.app.variables.map((variable) => {
            let varValue = varValues[variable.name];
            return m('td', {
              class: classNames(
                {true: varValue === true},
                {false: varValue === false}
              )
            },
            this.getBoolStr(varValue));
          }),
          this.app.expressions.map((expression) => {
            let exprValue;
            // Don't re-evaluate expression if it is known to be invalid
            if (expression.string in invalidExpressionCache) {
              exprValue = null;
            } else {
              exprValue = expression.evaluate(varValues);
              if (exprValue === null) {
                // The value stored with the key in the cache doesn't really matter;
                // the cache itself functions more as a set than a dictionary
                invalidExpressionCache[expression.string] = true;
              }
            }
            return m('td', {
              class: classNames(
                {true: exprValue === true},
                {false: exprValue === false},
                {invalid: exprValue === null}
              )
            }, this.getBoolStr(exprValue));
          })
        ]);
      }))
    ]);
  }

}

export default TableComponent;

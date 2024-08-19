import m from 'mithril';
import clsx from 'clsx';

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
  }

  removeExpression(clickEvent) {
    this.app.expressions.remove(this.getExpressionIndex(clickEvent.target));
    this.app.save();
  }

  handleControls(clickEvent) {
    // There is no need for an 'else' case, because we are only using event
    // delegation to capture clicks on the UI controls
    /* istanbul ignore else */
    if (clickEvent.target.classList.contains('control-add')) {
      this.addExpression(clickEvent);
    } else if (clickEvent.target.classList.contains('control-remove')) {
      this.removeExpression(clickEvent);
    }
  }

  focusNewExpression(inputVnode) {
    // There is no need for an 'else' case; we don't want cause unnecessary
    // behavior
    /* istanbul ignore else */
    if (this.app.expressions.lastInsertionIndex === inputVnode.attrs['data-index']) {
      inputVnode.dom.focus();
      // This is essential to ensure the last added input does not keep stealing
      // focus away
      this.app.expressions.lastInsertionIndex = null;
    }
  }

  view() {
    return m('table#truth-table', [
      m('thead', m('tr', {
        onclick: (clickEvent) => this.handleControls(clickEvent),
        oninput: (inputEvent) => this.updateExpressionString(inputEvent)
      }, [
        this.app.variables.map((variable) => {
          return m('th.variable', variable.name ? variable.name : '?');
        }),
        this.app.expressions.map((expression, e) => {
          return m('th.expression', { 'data-index': e }, m('div.has-controls', [
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
              class: clsx({
                true: varValue === true,
                false: varValue === false
              })
            },
            this.getBoolStr(varValue));
          }),
          this.app.expressions.map((expression) => {
            let exprValue = expression.evaluate(varValues);
            return m('td', {
              class: clsx({
                true: exprValue === true,
                false: exprValue === false,
                invalid: exprValue === null
              })
            }, this.getBoolStr(exprValue));
          })
        ]);
      }))
    ]);
  }

}

export default TableComponent;

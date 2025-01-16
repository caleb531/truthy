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
    const expressionElem = buttonElem.parentNode.parentNode;
    return Number(expressionElem.getAttribute('data-index'));
  }

  updateExpressionString(clickEvent) {
    const expression = this.app.expressions.get(this.getExpressionIndex(clickEvent.target));
    expression.string = clickEvent.target.value;
    this.app.save();
  }

  addExpression(clickEvent) {
    const expressionIndex = this.getExpressionIndex(clickEvent.target);
    const expression = this.app.expressions.get(expressionIndex);
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
    if (clickEvent.target.classList.contains('control-add')) {
      this.addExpression(clickEvent);
    } else if (clickEvent.target.classList.contains('control-remove')) {
      this.removeExpression(clickEvent);
    }
  }

  focusNewExpression(inputVnode) {
    // There is no need for an 'else' case; we don't want cause unnecessary
    // behavior
    if (this.app.expressions.lastInsertionIndex === inputVnode.attrs['data-index']) {
      inputVnode.dom.focus();
      // This is essential to ensure the last added input does not keep stealing
      // focus away
      this.app.expressions.lastInsertionIndex = null;
    }
  }

  view() {
    return (
      <table id="truth-table">
        <thead>
          <tr
            onclick={(clickEvent) => this.handleControls(clickEvent)}
            oninput={(inputEvent) => this.updateExpressionString(inputEvent)}
          >
            {this.app.variables.map((variable) => {
              return <th className="variable">{variable.name ? variable.name : '?'}</th>;
            })}
            {this.app.expressions.map((expression, e) => {
              return (
                <th className="expression" data-index={e}>
                  <div className="has-controls">
                    <div className="control control-add"></div>
                    {this.app.expressions.length > 1 ? (
                      <div className="control control-remove"></div>
                    ) : null}
                    <input
                      type="text"
                      size={Math.max(1, expression.string.length)}
                      value={expression.string}
                      autocapitalize="off"
                      autocomplete="off"
                      autocorrect="off"
                      spellcheck="false"
                      oncreate={(vnode) => this.focusNewExpression(vnode)}
                      onupdate={(vnode) => this.focusNewExpression(vnode)}
                      data-index={e}
                    />
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {this.app.variables.mapPermutations((varValues) => {
            return (
              <tr>
                {this.app.variables.map((variable) => {
                  const varValue = varValues[variable.name];
                  return (
                    <td
                      className={clsx({
                        true: varValue === true,
                        false: varValue === false
                      })}
                    >
                      {this.getBoolStr(varValue)}
                    </td>
                  );
                })}
                {this.app.expressions.map((expression) => {
                  const exprValue = expression.evaluate(varValues);
                  return (
                    <td
                      className={clsx({
                        true: exprValue === true,
                        false: exprValue === false,
                        invalid: exprValue === null
                      })}
                    >
                      {this.getBoolStr(exprValue)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default TableComponent;

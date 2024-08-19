import m from 'mithril';

// The variable collection UI that displays all variables available to the truth
// table
class VariableCollectionComponent {
  oninit(vnode) {
    this.app = vnode.attrs.app;
  }

  getVariableIndex(buttonElem) {
    let variableElem = buttonElem.parentNode.parentNode;
    return Number(variableElem.getAttribute('data-index'));
  }

  updateVariableName(inputEvent) {
    // Only update variable name if name is syntactically valid and if name is
    // not already in use
    /* istanbul ignore else */
    if (
      inputEvent.target.value === '' ||
      (this.validNamePattern.test(inputEvent.target.value) &&
        this.app.variables.checkNameAvailability(inputEvent.target.value))
    ) {
      let variable = this.app.variables.get(this.getVariableIndex(inputEvent.target));
      variable.name = inputEvent.target.value;
      this.app.save();
    }
  }

  addVariable(clickEvent) {
    let variableIndex = this.getVariableIndex(clickEvent.target);
    let variable = this.app.variables.get(variableIndex);
    let newVariableName = this.app.variables.getNextVariableName(variable);
    this.app.variables.insert(variableIndex + 1, {
      name: newVariableName
    });
    this.app.save();
  }

  removeVariable(clickEvent) {
    this.app.variables.remove(this.getVariableIndex(clickEvent.target));
    this.app.save();
  }

  handleControls(clickEvent) {
    // There is no need for an 'else' case, because we are only using event
    // delegation to capture clicks on the UI controls
    /* istanbul ignore else */
    if (clickEvent.target.classList.contains('control-add')) {
      this.addVariable(clickEvent);
    } else if (clickEvent.target.classList.contains('control-remove')) {
      this.removeVariable(clickEvent);
    }
  }

  focusNewVariable(inputVnode) {
    // There is no need for an 'else' case; we don't want cause unnecessary
    // behavior
    /* istanbul ignore else */
    if (this.app.variables.lastInsertionIndex === inputVnode.attrs['data-index']) {
      inputVnode.dom.focus();
      // This is essential to ensure the last added input does not keep stealing
      // focus away
      this.app.variables.lastInsertionIndex = null;
    }
  }

  view() {
    return (
      <div
        id="variables"
        onclick={(clickEvent) => this.handleControls(clickEvent)}
        oninput={(inputEvent) => this.updateVariableName(inputEvent)}
      >
        {this.app.variables.map((variable, v) => {
          return (
            <div className="variable" data-index={v}>
              <div className="has-controls">
                <div className="control control-add"></div>
                {this.app.variables.length > 1 ? (
                  <div className="control control-remove"></div>
                ) : null}
                <input
                  type="text"
                  value={variable.name}
                  maxlength={1}
                  autocapitalize="off"
                  autocomplete="off"
                  autocorrect="off"
                  spellcheck="false"
                  oncreate={(vnode) => this.focusNewVariable(vnode)}
                  onupdate={(vnode) => this.focusNewVariable(vnode)}
                  data-index={v}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

VariableCollectionComponent.prototype.validNamePattern = /^[A-Za-z]$/;

export default VariableCollectionComponent;

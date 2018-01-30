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
    if (inputEvent.target.value === '' || (this.validNamePattern.test(inputEvent.target.value) && this.app.variables.checkNameAvailability(inputEvent.target.value))) {
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
    this.lastCreatedVariableIndex = variableIndex + 1;
  }

  removeVariable(clickEvent) {
    this.app.variables.remove(this.getVariableIndex(clickEvent.target));
    this.app.save();
  }

  handleControls(clickEvent) {
    if (clickEvent.target.classList.contains('control-add')) {
      this.addVariable(clickEvent);
    } else if (clickEvent.target.classList.contains('control-remove')) {
      this.removeVariable(clickEvent);
    }
  }

  focusNewVariable(inputVnode) {
    if (this.lastCreatedVariableIndex === inputVnode.attrs['data-index']) {
      inputVnode.dom.focus();
      this.lastCreatedVariableIndex = null;
    }
  }

  view() {
    return m('div#variables', {
        onclick: (clickEvent) => this.handleControls(clickEvent),
        oninput: (inputEvent) => this.updateVariableName(inputEvent)
    }, this.app.variables.map((variable, v) => {
      return m('div.variable', { 'data-index': v }, m('div.has-controls', [
        m('div.control.control-add'),
        this.app.variables.length > 1 ? m('div.control.control-remove') : null,
        m('input', {
          type: 'text',
          value: variable.name,
          maxlength: 1,
          autocapitalize: 'off',
          autocomplete: 'off',
          autocorrect: 'off',
          spellcheck: false,
          oncreate: (vnode) => this.focusNewVariable(vnode),
          onupdate: (vnode) => this.focusNewVariable(vnode),
          'data-index': v
        })
      ]));
    }));
  }

}

VariableCollectionComponent.prototype.validNamePattern = /^[A-Za-z]$/;

export default VariableCollectionComponent;

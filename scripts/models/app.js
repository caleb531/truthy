import ExpressionCollection from './expression-collection.js';
import VariableCollection from './variable-collection.js';

// A singleton representing the core state of the application, including
// variables and expressions
class App {
  constructor({ variables, expressions } = {}) {
    if (variables) {
      this.variables = new VariableCollection(variables);
    } else {
      this.variables = new VariableCollection({
        items: [{ name: 'p' }, { name: 'q' }]
      });
    }
    if (expressions) {
      this.expressions = new ExpressionCollection(expressions);
    } else {
      this.expressions = new ExpressionCollection({
        items: [{ string: 'not p' }, { string: 'p and q' }, { string: 'p or q' }]
      });
    }
  }

  serialize() {
    return {
      variables: this.variables.serialize(),
      expressions: this.expressions.serialize()
    };
  }

  save() {
    localStorage.setItem(App.storageKey, JSON.stringify(this.serialize()));
  }
}

// The key to use for storing the app data in localStorage
App.storageKey = 'truthy-v3';

App.restore = function () {
  const appStr = localStorage.getItem(App.storageKey);
  if (appStr !== null) {
    return new App(JSON.parse(appStr));
  } else {
    return new App();
  }
};

export default App;

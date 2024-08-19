// A variable used in an expression string
class Variable {
  constructor({ name }) {
    this.name = name;
  }

  serialize() {
    return {
      name: this.name
    };
  }
}

export default Variable;

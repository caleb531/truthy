// A variable used in an expression string
class Variable {

  /* eslint-disable no-shadow */
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

import ExpressionParser from './expression.parser.pegjs';

// A boolean expression to display in the truth table
class Expression {

  constructor({ string }) {
    // The string expression to display in the truth table
    this.string = string;
  }

  // Parse and evaluate the expression to either true or false
  evaluate(varValues) {
    try {
      return ExpressionParser.parse(this.string, {
        varValues: varValues
      });
    } catch (error) {
      return null;
    }
  }

  serialize() {
    return {
      string: this.string
    };
  }

}

export default Expression;

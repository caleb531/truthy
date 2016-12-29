'use strict';

var ExpressionParser = require('./expression.parser');

function Expression(args) {
  // The string expression to display in the truth table
  this.string = args.string;
}

// Parse and evaluate the expression to either true or false
Expression.prototype.evaluate = function (varValues) {
  return ExpressionParser.parse(this.string, {
    varValues: varValues
  });
};

module.exports = Expression;

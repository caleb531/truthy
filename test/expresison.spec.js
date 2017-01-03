'use strict';

var expect = require('chai').expect;
var Expression = require('../app/scripts/expression');

describe('expression', function () {

  it('should initialize expression with unmodified input string', function () {
    var expression = new Expression({
      string: ' p and q '
    });
    expect(expression).to.have.property('string', ' p and q ');
  });

  function testExprs(args) {
    // Generate a test for each supplied expression
    args.exprStrings.forEach(function (exprString) {
      var expression = new Expression({string: exprString});
      it('should evaluate `' + exprString + '`', function () {
        // Test each expression against the given permutations of variable
        // values and the expected outputs
        args.testCases.forEach(function (testCase) {
          var actualOutput = expression.evaluate(testCase.varValues);
          expect(actualOutput).to.equal(testCase.output);
        });
      });
    });
  }

  describe('NOT operation', function () {
    testExprs({
      exprStrings: ['not p', 'not  p', 'NoT p', '!p', '!  p'],
      testCases: [
        {varValues: {p: false}, output: true},
        {varValues: {p: true}, output: false}
      ]
    });
  });

});

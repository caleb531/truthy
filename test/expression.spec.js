import _ from 'underscore';
import Expression from '../app/scripts/models/expression.js';

describe('expression', function () {

  it('should initialize with unmodified input string', function () {
    let expression = new Expression({
      string: ' p and q '
    });
    expect(expression).toHaveProperty('string', ' p and q ');
  });

  it('should serialize to a JSON object', function () {
    let serializedExpression = { string: 'p xor q' };
    let expression = new Expression(serializedExpression);
    expect(expression.serialize()).toEqual(serializedExpression);
  });

  // Expect some expression string to evaluate to some set of values given some
  // set of inputs
  expect.extend({
    toEvaluateTo: function (expressionStr, testCases) {
      let expression = new Expression({ string: expressionStr });
      // Test each expression against the given permutations of variable values
      // and the expected outputs
      const testResults = testCases.map((testCase) => {
        let actualOutput = expression.evaluate(testCase.varValues);
        // String of current variable values for display in fail message
        let varValuesStr = _.map(testCase.varValues, function (varValue, varName) {
          return varName + ' is ' + varValue;
        }).join(' and ');
        const message = () => `expected ${expressionStr} to evaluate to ${testCase.output} but got ${actualOutput} (when ${varValuesStr})`;
        if (actualOutput === testCase.output) {
          return { message, pass: true };
        } else {
          return { message, pass: false };
        }
      });

      return testResults.find((result) => {
        return !result.pass;
      }) || testResults[testResults.length - 1];
    }
  });

  describe('variable name', function () {

    it('should evaluate', function () {
      expect('p').toEvaluateTo([
        { varValues: { p: false }, output: false },
        { varValues: { p: true }, output: true }
      ]);
    });

    it('may be uppercase', function () {
      expect('P').toEvaluateTo([
        { varValues: { P: false }, output: false },
        { varValues: { P: true }, output: true }
      ]);
    });

    it('may be any letter', function () {
      expect('a').toEvaluateTo([
        { varValues: { a: false }, output: false },
        { varValues: { a: true }, output: true }
      ]);
      expect('z').toEvaluateTo([
        { varValues: { z: false }, output: false },
        { varValues: { z: true }, output: true }
      ]);
    });

    it('should be case-sensitive', function () {
      expect('p').toEvaluateTo([
        { varValues: { P: false }, output: null },
        { varValues: { P: true }, output: null }
      ]);
      expect('P').toEvaluateTo([
        { varValues: { p: false }, output: null },
        { varValues: { p: true }, output: null }
      ]);
    });

  });

  describe('boolean value', function () {

    describe('false', function () {

      let testCases = [
        { varValues: { p: false }, output: false },
        { varValues: { p: true }, output: false }
      ];

      it('should evaluate', function () {
        expect('false').toEvaluateTo(testCases);
      });

      it('should be case-insensitive', function () {
        expect('FaLsE').toEvaluateTo(testCases);
      });

    });

    describe('true', function () {

      let testCases = [
        { varValues: { p: false }, output: true },
        { varValues: { p: true }, output: true }
      ];

      it('should evaluate', function () {
        expect('true').toEvaluateTo(testCases);
      });

      it('should be case-insensitive', function () {
        expect('tRuE').toEvaluateTo(testCases);
      });

    });

  });

  describe('NOT operation', function () {

    let testCases = [
      { varValues: { p: false }, output: true },
      { varValues: { p: true }, output: false }
    ];

    it('should evaluate named operator', function () {
      expect('not p').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('not  p').toEvaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('NoT p').toEvaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('!p').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('!  p').toEvaluateTo(testCases);
    });

    it('should not coerce nonexistent variable name', function () {
      expect('!a').toEvaluateTo([
        { varValues: { p: false }, output: null },
        { varValues: { p: true }, output: null }
      ]);
    });

  });

  describe('AND operation', function () {

    let testCases = [
      { varValues: { p: false, q: false }, output: false },
      { varValues: { p: false, q: true }, output: false },
      { varValues: { p: true, q: false }, output: false },
      { varValues: { p: true, q: true }, output: true }
    ];

    it('should evaluate named operator', function () {
      expect('p and q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  and  q').toEvaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p AnD q').toEvaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('p&q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  &  q').toEvaluateTo(testCases);
    });

    it('should evaluate shorthand logical operator', function () {
      expect('p&&q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand logical operator', function () {
      expect('p  &&  q').toEvaluateTo(testCases);
    });

    it('should evaluate arithmetic operator', function () {
      expect('p*q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around arithmetic operator', function () {
      expect('p  *  q').toEvaluateTo(testCases);
    });

  });

  describe('NAND operation', function () {

    let testCases = [
      { varValues: { p: false, q: false }, output: true },
      { varValues: { p: false, q: true }, output: true },
      { varValues: { p: true, q: false }, output: true },
      { varValues: { p: true, q: true }, output: false }
    ];

    it('should evaluate operator', function () {
      expect('p nand q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around operator', function () {
      expect('p  nand  q').toEvaluateTo(testCases);
    });

    it('should ignore operator case', function () {
      expect('p NanD q').toEvaluateTo(testCases);
    });

  });

  describe('OR operation', function () {

    let testCases = [
      { varValues: { p: false, q: false }, output: false },
      { varValues: { p: false, q: true }, output: true },
      { varValues: { p: true, q: false }, output: true },
      { varValues: { p: true, q: true }, output: true }
    ];

    it('should evaluate named operator', function () {
      expect('p or q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  or  q').toEvaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p oR q').toEvaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('p|q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  |  q').toEvaluateTo(testCases);
    });

    it('should evaluate shorthand logical operator', function () {
      expect('p||q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand logical operator', function () {
      expect('p  ||  q').toEvaluateTo(testCases);
    });

    it('should evaluate arithmetic operator', function () {
      expect('p+q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around arithmetic operator', function () {
      expect('p  +  q').toEvaluateTo(testCases);
    });

  });

  describe('NOR operation', function () {

    let testCases = [
      { varValues: { p: false, q: false }, output: true },
      { varValues: { p: false, q: true }, output: false },
      { varValues: { p: true, q: false }, output: false },
      { varValues: { p: true, q: true }, output: false }
    ];

    it('should evaluate operator', function () {
      expect('p nor q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around operator', function () {
      expect('p  nor  q').toEvaluateTo(testCases);
    });

    it('should ignore operator case', function () {
      expect('p NoR q').toEvaluateTo(testCases);
    });

  });

  describe('XOR operation', function () {

    let testCases = [
      { varValues: { p: false, q: false }, output: false },
      { varValues: { p: false, q: true }, output: true },
      { varValues: { p: true, q: false }, output: true },
      { varValues: { p: true, q: true }, output: false }
    ];

    it('should evaluate named operator', function () {
      expect('p xor q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  xor  q').toEvaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p xOr q').toEvaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('p^q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  ^  q').toEvaluateTo(testCases);
    });

  });

  describe('implication operation', function () {

    let testCases = [
      { varValues: { p: false, q: false }, output: true },
      { varValues: { p: false, q: true }, output: true },
      { varValues: { p: true, q: false }, output: false },
      { varValues: { p: true, q: true }, output: true }
    ];

    it('should evaluate operator', function () {
      expect('p->q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around operator', function () {
      expect('p  ->  q').toEvaluateTo(testCases);
    });

  });

  describe('double-implication (XNOR) operation', function () {

    let testCases = [
      { varValues: { p: false, q: false }, output: true },
      { varValues: { p: false, q: true }, output: false },
      { varValues: { p: true, q: false }, output: false },
      { varValues: { p: true, q: true }, output: true }
    ];

    it('should evaluate shorthand operator', function () {
      expect('p<->q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  <->  q').toEvaluateTo(testCases);
    });

    it('should evaluate named operator', function () {
      expect('p xnor q').toEvaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  xnor  q').toEvaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p xNoR q').toEvaluateTo(testCases);
    });

  });

  it('should respect parentheses', function () {
    expect('p & (p | !q)').toEvaluateTo([
      { varValues: { p: false, q: false }, output: false },
      { varValues: { p: false, q: true }, output: false },
      { varValues: { p: true, q: false }, output: true },
      { varValues: { p: true, q: true }, output: true }
    ]);
  });

  it('should ignore leading/trailing whitespace', function () {
    expect('  p & q  ').toEvaluateTo([
      { varValues: { p: false, q: false }, output: false },
      { varValues: { p: false, q: true }, output: false },
      { varValues: { p: true, q: false }, output: false },
      { varValues: { p: true, q: true }, output: true }
    ]);
  });

  it('should count tabs/newlines as ignored whitespace', function () {
    expect('\n p \t & \n q \t').toEvaluateTo([
      { varValues: { p: false, q: false }, output: false },
      { varValues: { p: false, q: true }, output: false },
      { varValues: { p: true, q: false }, output: false },
      { varValues: { p: true, q: true }, output: true }
    ]);
  });

  describe('more than two variables', function () {

    let testCases = [
      { varValues: { p: false, q: false, r: false }, output: false },
      { varValues: { p: false, q: false, r: true }, output: true },
      { varValues: { p: false, q: true, r: false }, output: true },
      { varValues: { p: false, q: true, r: true }, output: false },
      { varValues: { p: true, q: false, r: false }, output: true },
      { varValues: { p: true, q: false, r: true }, output: false },
      { varValues: { p: true, q: true, r: false }, output: false },
      { varValues: { p: true, q: true, r: true }, output: true }
    ];

    it('should evaluate named operator', function () {
      expect('p xor q xor r').toEvaluateTo(testCases);
    });

  });

});

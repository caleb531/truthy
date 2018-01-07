import _ from 'underscore';
import { expect, Assertion } from 'chai';
import Expression from '../app/scripts/models/expression.js';

describe('expression', () => {

  it('should initialize with unmodified input string', () => {
    let expression = new Expression({
      string: ' p and q '
    });
    expect(expression).to.have.property('string', ' p and q ');
  });

  it('should serialize to a JSON object', () => {
    let serializedExpression = {string: 'p xor q'};
    let expression = new Expression(serializedExpression);
    expect(expression.serialize()).to.deep.equal(serializedExpression);
  });

  // Expect some expression string to evaluate to some set of values given some
  // set of inputs
  Assertion.addMethod('evaluateTo', function (testCases) {
    let assertion = this;
    let expression = new Expression({string: assertion._obj});
    // Test each expression against the given permutations of variable values
    // and the expected outputs
    testCases.forEach((testCase) => {
      let actualOutput = expression.evaluate(testCase.varValues);
      // String of current variable values for display in fail message
      let varValuesStr = _.map(testCase.varValues, (varValue, varName) => {
        return varName + ' is ' + varValue;
      }).join(' and ');
      assertion.assert(
        // Condition to assert
        actualOutput === testCase.output,
        // Message to output if affirmative assertion (to.*) fails
        'expected #{this} to evaluate to #{exp} but got #{act} (when ' + varValuesStr + ')',
        // Message to output if negative assertion (not.to.*) fails
        'expected #{this} not to evaluate to #{exp} (when ' + varValuesStr + ')',
        // Expected value
        testCase.output,
        // Actual value
        actualOutput
      );
    });
  });

  describe('variable name', () => {

    it('should evaluate', () => {
      expect('p').to.evaluateTo([
        {varValues: {p: false}, output: false},
        {varValues: {p: true}, output: true}
      ]);
    });

    it('may be uppercase', () => {
      expect('P').to.evaluateTo([
        {varValues: {P: false}, output: false},
        {varValues: {P: true}, output: true}
      ]);
    });

    it('may be any letter', () => {
      expect('a').to.evaluateTo([
        {varValues: {a: false}, output: false},
        {varValues: {a: true}, output: true}
      ]);
      expect('z').to.evaluateTo([
        {varValues: {z: false}, output: false},
        {varValues: {z: true}, output: true}
      ]);
    });

    it('should be case-sensitive', () => {
      expect('p').to.evaluateTo([
        {varValues: {P: false}, output: null},
        {varValues: {P: true}, output: null}
      ]);
      expect('P').to.evaluateTo([
        {varValues: {p: false}, output: null},
        {varValues: {p: true}, output: null}
      ]);
    });

  });

  describe('boolean value', () => {

    describe('false', () => {

      let testCases = [
        {varValues: {p: false}, output: false},
        {varValues: {p: true}, output: false}
      ];

      it('should evaluate', () => {
        expect('false').to.evaluateTo(testCases);
      });

      it('should be case-insensitive', () => {
        expect('FaLsE').to.evaluateTo(testCases);
      });

    });

    describe('true', () => {

      let testCases = [
        {varValues: {p: false}, output: true},
        {varValues: {p: true}, output: true}
      ];

      it('should evaluate', () => {
        expect('true').to.evaluateTo(testCases);
      });

      it('should be case-insensitive', () => {
        expect('tRuE').to.evaluateTo(testCases);
      });

    });

  });

  describe('NOT operation', () => {

    let testCases = [
      {varValues: {p: false}, output: true},
      {varValues: {p: true}, output: false}
    ];

    it('should evaluate named operator', () => {
      expect('not p').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', () => {
      expect('not  p').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', () => {
      expect('NoT p').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', () => {
      expect('!p').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', () => {
      expect('!  p').to.evaluateTo(testCases);
    });

    it('should not coerce nonexistent variable name', () => {
      expect('!a').to.evaluateTo([
        {varValues: {p: false}, output: null},
        {varValues: {p: true}, output: null}
      ]);
    });

  });

  describe('AND operation', () => {

    let testCases = [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate named operator', () => {
      expect('p and q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', () => {
      expect('p  and  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', () => {
      expect('p AnD q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', () => {
      expect('p&q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', () => {
      expect('p  &  q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand logical operator', () => {
      expect('p&&q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand logical operator', () => {
      expect('p  &&  q').to.evaluateTo(testCases);
    });

  });

  describe('NAND operation', () => {

    let testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: false}
    ];

    it('should evaluate operator', () => {
      expect('p nand q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around operator', () => {
      expect('p  nand  q').to.evaluateTo(testCases);
    });

    it('should ignore operator case', () => {
      expect('p NanD q').to.evaluateTo(testCases);
    });

  });

  describe('OR operation', () => {

    let testCases = [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate named operator', () => {
      expect('p or q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', () => {
      expect('p  or  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', () => {
      expect('p oR q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', () => {
      expect('p|q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', () => {
      expect('p  |  q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand logical operator', () => {
      expect('p||q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand logical operator', () => {
      expect('p  ||  q').to.evaluateTo(testCases);
    });

  });

  describe('NOR operation', () => {

    let testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: false}
    ];

    it('should evaluate operator', () => {
      expect('p nor q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around operator', () => {
      expect('p  nor  q').to.evaluateTo(testCases);
    });

    it('should ignore operator case', () => {
      expect('p NoR q').to.evaluateTo(testCases);
    });

  });

  describe('XOR operation', () => {

    let testCases = [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: false}
    ];

    it('should evaluate named operator', () => {
      expect('p xor q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', () => {
      expect('p  xor  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', () => {
      expect('p xOr q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', () => {
      expect('p^q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', () => {
      expect('p  ^  q').to.evaluateTo(testCases);
    });

  });

  describe('implication operation', () => {

    let testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate operator', () => {
      expect('p->q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around operator', () => {
      expect('p  ->  q').to.evaluateTo(testCases);
    });

  });

  describe('double-implication (XNOR) operation', () => {

    let testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate shorthand operator', () => {
      expect('p<->q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', () => {
      expect('p  <->  q').to.evaluateTo(testCases);
    });

    it('should evaluate named operator', () => {
      expect('p xnor q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', () => {
      expect('p  xnor  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', () => {
      expect('p xNoR q').to.evaluateTo(testCases);
    });

  });

  it('should respect parentheses', () => {
    expect('p & (p | !q)').to.evaluateTo([
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

  it('should ignore leading/trailing whitespace', () => {
    expect('  p & q  ').to.evaluateTo([
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

  it('should count tabs/newlines as ignored whitespace', () => {
    expect('\n p \t & \n q \t').to.evaluateTo([
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

});

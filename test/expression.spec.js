'use strict';

var _ = require('underscore');
var chai = require('chai');
var expect = chai.expect;
var Assertion = chai.Assertion;
var Expression = require('../app/scripts/models/expression');

describe('expression', function () {

  it('should initialize with unmodified input string', function () {
    var expression = new Expression({
      string: ' p and q '
    });
    expect(expression).to.have.property('string', ' p and q ');
  });

  it('should serialize to a JSON object', function () {
    var serializedExpression = {string: 'p xor q'};
    var expression = new Expression(serializedExpression);
    expect(expression.serialize()).to.deep.equal(serializedExpression);
  });

  // Expect some expression string to evaluate to some set of values given some
  // set of inputs
  Assertion.addMethod('evaluateTo', function (testCases) {
    var assertion = this;
    var expression = new Expression({string: assertion._obj});
    // Test each expression against the given permutations of variable values
    // and the expected outputs
    testCases.forEach(function (testCase) {
      var actualOutput = expression.evaluate(testCase.varValues);
      // String of current variable values for display in fail message
      var varValuesStr = _.map(testCase.varValues, function (varValue, varName) {
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

  describe('variable name', function () {

    it('should evaluate', function () {
      expect('p').to.evaluateTo([
        {varValues: {p: false}, output: false},
        {varValues: {p: true}, output: true}
      ]);
    });

    it('may be uppercase', function () {
      expect('P').to.evaluateTo([
        {varValues: {P: false}, output: false},
        {varValues: {P: true}, output: true}
      ]);
    });

    it('may be any letter', function () {
      expect('a').to.evaluateTo([
        {varValues: {a: false}, output: false},
        {varValues: {a: true}, output: true}
      ]);
      expect('z').to.evaluateTo([
        {varValues: {z: false}, output: false},
        {varValues: {z: true}, output: true}
      ]);
    });

    it('should be case-sensitive', function () {
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

  describe('boolean value', function () {

    describe('false', function () {

      var testCases = [
        {varValues: {p: false}, output: false},
        {varValues: {p: true}, output: false}
      ];

      it('should evaluate', function () {
        expect('false').to.evaluateTo(testCases);
      });

      it('should be case-insensitive', function () {
        expect('FaLsE').to.evaluateTo(testCases);
      });

    });

    describe('true', function () {

      var testCases = [
        {varValues: {p: false}, output: true},
        {varValues: {p: true}, output: true}
      ];

      it('should evaluate', function () {
        expect('true').to.evaluateTo(testCases);
      });

      it('should be case-insensitive', function () {
        expect('tRuE').to.evaluateTo(testCases);
      });

    });

  });

  describe('NOT operation', function () {

    var testCases = [
      {varValues: {p: false}, output: true},
      {varValues: {p: true}, output: false}
    ];

    it('should evaluate named operator', function () {
      expect('not p').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('not  p').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('NoT p').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('!p').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('!  p').to.evaluateTo(testCases);
    });

    it('should not coerce nonexistent variable name', function () {
      expect('!a').to.evaluateTo([
        {varValues: {p: false}, output: null},
        {varValues: {p: true}, output: null}
      ]);
    });

  });

  describe('AND operation', function () {

    var testCases = [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate named operator', function () {
      expect('p and q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  and  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p AnD q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('p&q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  &  q').to.evaluateTo(testCases);
    });

  });

  describe('NAND operation', function () {

    var testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: false}
    ];

    it('should evaluate operator', function () {
      expect('p nand q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around operator', function () {
      expect('p  nand  q').to.evaluateTo(testCases);
    });

    it('should ignore operator case', function () {
      expect('p NanD q').to.evaluateTo(testCases);
    });

  });

  describe('OR operation', function () {

    var testCases = [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate named operator', function () {
      expect('p or q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  or  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p oR q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('p|q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  |  q').to.evaluateTo(testCases);
    });

  });

  describe('NOR operation', function () {

    var testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: false}
    ];

    it('should evaluate operator', function () {
      expect('p nor q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around operator', function () {
      expect('p  nor  q').to.evaluateTo(testCases);
    });

    it('should ignore operator case', function () {
      expect('p NoR q').to.evaluateTo(testCases);
    });

  });

  describe('XOR operation', function () {

    var testCases = [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: false}
    ];

    it('should evaluate named operator', function () {
      expect('p xor q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  xor  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p xOr q').to.evaluateTo(testCases);
    });

    it('should evaluate shorthand operator', function () {
      expect('p^q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  ^  q').to.evaluateTo(testCases);
    });

  });

  describe('implication operation', function () {

    var testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: true},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate operator', function () {
      expect('p->q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around operator', function () {
      expect('p  ->  q').to.evaluateTo(testCases);
    });

  });

  describe('double-implication (XNOR) operation', function () {

    var testCases = [
      {varValues: {p: false, q: false}, output: true},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ];

    it('should evaluate shorthand operator', function () {
      expect('p<->q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around shorthand operator', function () {
      expect('p  <->  q').to.evaluateTo(testCases);
    });

    it('should evaluate named operator', function () {
      expect('p xnor q').to.evaluateTo(testCases);
    });

    it('should ignore whitespace around named operator', function () {
      expect('p  xnor  q').to.evaluateTo(testCases);
    });

    it('should ignore named operator case', function () {
      expect('p xNoR q').to.evaluateTo(testCases);
    });

  });

  it('should respect parentheses', function () {
    expect('p & (p | !q)').to.evaluateTo([
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

  it('should ignore leading/trailing whitespace', function () {
    expect('  p & q  ').to.evaluateTo([
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

  it('should count tabs/newlines as ignored whitespace', function () {
    expect('\n p \t & \n q \t').to.evaluateTo([
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

});

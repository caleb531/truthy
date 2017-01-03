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

  function testExpr(expressionString, testCases) {
    var expression = new Expression({string: expressionString});
    // Test each expression against the given permutations of variable
    // values and the expected outputs
    testCases.forEach(function (testCase) {
      var actualOutput = expression.evaluate(testCase.varValues);
      expect(actualOutput).to.equal(testCase.output);
    });
  }

  describe('variable name', function () {
    it('should evaluate', function () {
      testExpr('p', [
        {varValues: {p: false}, output: false},
        {varValues: {p: true}, output: true}
      ]);
    });
    it('should be case-sensitive', function () {
      testExpr('P', [
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
        testExpr('false', testCases);
      });
      it('should be case-insensitive', function () {
        testExpr('FaLsE', testCases);
      });
    });
    describe('true', function () {
      var testCases = [
        {varValues: {p: false}, output: true},
        {varValues: {p: true}, output: true}
      ];
      it('should evaluate', function () {
        testExpr('true', testCases);
      });
      it('should be case-insensitive', function () {
        testExpr('tRuE', testCases);
      });
    });
  });

  describe('NOT operation', function () {
    var testCases = [
      {varValues: {p: false}, output: true},
      {varValues: {p: true}, output: false}
    ];
    it('should evaluate named operator', function () {
      testExpr('not p', testCases);
    });
    it('should ignore whitespace around named operator', function () {
      testExpr('not  p', testCases);
    });
    it('should ignore named operator case', function () {
      testExpr('NoT p', testCases);
    });
    it('should evaluate shorthand operator', function () {
      testExpr('!p', testCases);
    });
    it('should ignore whitespace around shorthand operator', function () {
      testExpr('!  p', testCases);
    });
    it('should not coerce nonexistent variable name', function () {
      testExpr('!a', [
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
      testExpr('p and q', testCases);
    });
    it('should ignore whitespace around named operator', function () {
      testExpr('p  and  q', testCases);
    });
    it('should ignore named operator case', function () {
      testExpr('p AnD q', testCases);
    });
    it('should evaluate shorthand operator', function () {
      testExpr('p&q', testCases);
    });
    it('should ignore whitespace around shorthand operator', function () {
      testExpr('p  &  q', testCases);
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
      testExpr('p nand q', testCases);
    });
    it('should ignore whitespace around operator', function () {
      testExpr('p  nand  q', testCases);
    });
    it('should ignore operator case', function () {
      testExpr('p NanD q', testCases);
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
      testExpr('p or q', testCases);
    });
    it('should ignore whitespace around named operator', function () {
      testExpr('p  or  q', testCases);
    });
    it('should ignore named operator case', function () {
      testExpr('p oR q', testCases);
    });
    it('should evaluate shorthand operator', function () {
      testExpr('p|q', testCases);
    });
    it('should ignore whitespace around shorthand operator', function () {
      testExpr('p  |  q', testCases);
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
      testExpr('p nor q', testCases);
    });
    it('should ignore whitespace around operator', function () {
      testExpr('p  nor  q', testCases);
    });
    it('should ignore operator case', function () {
      testExpr('p NoR q', testCases);
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
      testExpr('p xor q', testCases);
    });
    it('should ignore whitespace around named operator', function () {
      testExpr('p  xor  q', testCases);
    });
    it('should ignore named operator case', function () {
      testExpr('p xOr q', testCases);
    });
    it('should evaluate shorthand operator', function () {
      testExpr('p^q', testCases);
    });
    it('should ignore whitespace around shorthand operator', function () {
      testExpr('p  ^  q', testCases);
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
      testExpr('p->q', testCases);
    });
    it('should ignore whitespace around operator', function () {
      testExpr('p  ->  q', testCases);
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
      testExpr('p<->q', testCases);
    });
    it('should ignore whitespace around shorthand operator', function () {
      testExpr('p  <->  q', testCases);
    });
    it('should evaluate named operator', function () {
      testExpr('p xnor q', testCases);
    });
    it('should ignore whitespace around named operator', function () {
      testExpr('p  xnor  q', testCases);
    });
    it('should ignore named operator case', function () {
      testExpr('p xNoR q', testCases);
    });
  });

  it('should respect parentheses', function () {
    testExpr('p & (p | !q)', [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: true},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

  it('should ignore leading/trailing whitespace', function () {
    testExpr('  p & q  ', [
      {varValues: {p: false, q: false}, output: false},
      {varValues: {p: false, q: true}, output: false},
      {varValues: {p: true, q: false}, output: false},
      {varValues: {p: true, q: true}, output: true}
    ]);
  });

});

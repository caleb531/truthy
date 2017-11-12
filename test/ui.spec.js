'use strict';

var chai = require('chai');
chai.use(require('chai-dom'));
var expect = chai.expect;
var m = require('mithril');
var AppComponent = require('../app/scripts/components/app');

describe('app UI', function () {

  beforeEach(function () {
    m.mount(document.body, AppComponent);
  });

  afterEach(function () {
    m.mount(document.body, null);
  });

  it('should render default variables', function () {
    var variables = document.querySelectorAll('div.variable input');
    expect(variables).to.have.length(2);
    expect(variables[0]).to.have.value('p');
    expect(variables[1]).to.have.value('q');
  });

  it('should render default expressions', function () {
    var expressions = document.querySelectorAll('th.expression input');
    expect(expressions).to.have.length(3);
    expect(expressions[0]).to.have.value('not p');
    expect(expressions[1]).to.have.value('p and q');
    expect(expressions[2]).to.have.value('p or q');
  });

  it('should construct table', function () {
    var table = document.querySelector('table');
    expect(table.querySelectorAll('thead th')).to.have.length(5);
    expect(table.querySelectorAll('tbody tr')).to.have.length(4);
  });

  it('should build variable permutations', function () {
    var table = document.querySelector('table');
    var variables = table.querySelectorAll('th.variable');
    expect(variables[0]).to.have.text('p');
    expect(variables[1]).to.have.text('q');
    var rows = table.querySelectorAll('tbody tr');
    expect(rows[0].querySelectorAll('td')[0]).to.have.text('F');
    expect(rows[0].querySelectorAll('td')[1]).to.have.text('F');
    expect(rows[1].querySelectorAll('td')[0]).to.have.text('F');
    expect(rows[1].querySelectorAll('td')[1]).to.have.text('T');
    expect(rows[2].querySelectorAll('td')[0]).to.have.text('T');
    expect(rows[2].querySelectorAll('td')[1]).to.have.text('F');
    expect(rows[3].querySelectorAll('td')[0]).to.have.text('T');
    expect(rows[3].querySelectorAll('td')[1]).to.have.text('T');
  });

  it('should add new variable', function () {
    var variables = document.querySelectorAll('div.variable');
    expect(variables).to.have.length(2);
    variables[0].querySelector('.control-add').click();
    m.redraw.sync();
    expect(document.querySelectorAll('div.variable')).to.have.length(3);
    expect(document.querySelectorAll('div.variable input')[1]).to.have.value('r');
  });

  it('should remove existing variable', function () {
    var variables = document.querySelectorAll('div.variable');
    expect(variables).to.have.length(2);
    variables[0].querySelector('.control-remove').click();
    m.redraw.sync();
    expect(document.querySelectorAll('div.variable')).to.have.length(1);
    expect(document.querySelector('div.variable input')).to.have.value('q');
  });

  it('should update existing variable', function () {
    var variable = document.querySelector('div.variable input');
    variable.value = 'a';
    variable.dispatchEvent(new Event('input', {bubbles: true}));
    m.redraw.sync();
    expect(document.querySelector('th.variable')).to.have.text('a');
  });

  it('should add new expression', function () {
    var expressions = document.querySelectorAll('th.expression');
    expect(expressions).to.have.length(3);
    expressions[0].querySelector('.control-add').click();
    m.redraw.sync();
    expect(document.querySelectorAll('th.expression')).to.have.length(4);
    expect(document.querySelectorAll('th.expression input')[1]).to.have.value('not p');
  });

  it('should remove existing expression', function () {
    var expressions = document.querySelectorAll('th.expression');
    expect(expressions).to.have.length(3);
    expressions[0].querySelector('.control-remove').click();
    m.redraw.sync();
    expect(document.querySelectorAll('th.expression')).to.have.length(2);
    expect(document.querySelector('th.expression input')).to.have.value('p and q');
  });

  it('should update existing expression', function () {
    var expression = document.querySelector('th.expression input');
    expression.value = 'p xor q';
    expression.dispatchEvent(new Event('input', {bubbles: true}));
    m.redraw.sync();
    var values = document.querySelectorAll('td:nth-child(3)');
    expect(values[0]).to.have.text('F');
    expect(values[1]).to.have.text('T');
    expect(values[2]).to.have.text('T');
    expect(values[3]).to.have.text('F');
  });

  it('should open reference sidebar', function () {
    var reference = document.querySelector('#reference');
    expect(reference).not.to.have.class('reference-is-open');
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    expect(reference).to.have.class('reference-is-open');
  });

  it('should close reference sidebar via button', function () {
    var reference = document.querySelector('#reference');
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('img.reference-close-control').click();
    m.redraw.sync();
    expect(reference).not.to.have.class('reference-is-open');
  });

  it('should close reference sidebar via overlay', function () {
    var reference = document.querySelector('#reference');
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    reference.click();
    m.redraw.sync();
    expect(reference).not.to.have.class('reference-is-open');
  });

});

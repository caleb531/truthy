import chaiDom from 'chai-dom';
chai.use(chaiDom);
import m from 'mithril';
import AppComponent from '../app/scripts/components/app.js';

describe('app UI', function () {

  beforeEach(function () {
    localStorage.clear();
    document.body.appendChild(document.createElement('main'));
    m.mount(document.querySelector('main'), AppComponent);
  });

  afterEach(function () {
    m.mount(document.querySelector('main'), null);
    localStorage.clear();
  });

  it('should render default variables', function () {
    let variables = document.querySelectorAll('div.variable input');
    expect(variables).to.have.length(2);
    expect(variables[0]).to.have.value('p');
    expect(variables[1]).to.have.value('q');
  });

  it('should render default expressions', function () {
    let expressions = document.querySelectorAll('th.expression input');
    expect(expressions).to.have.length(3);
    expect(expressions[0]).to.have.value('not p');
    expect(expressions[1]).to.have.value('p and q');
    expect(expressions[2]).to.have.value('p or q');
  });

  it('should construct table', function () {
    let table = document.querySelector('table');
    expect(table.querySelectorAll('thead th')).to.have.length(5);
    expect(table.querySelectorAll('tbody tr')).to.have.length(4);
  });

  it('should build variable permutations', function () {
    let table = document.querySelector('table');
    let variables = table.querySelectorAll('th.variable');
    expect(variables[0]).to.have.text('p');
    expect(variables[1]).to.have.text('q');
    let rows = table.querySelectorAll('tbody tr');
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
    let variables = document.querySelectorAll('div.variable');
    expect(variables).to.have.length(2);
    variables[0].querySelector('.control-add').click();
    m.redraw.sync();
    expect(document.querySelectorAll('div.variable')).to.have.length(3);
    expect(document.querySelectorAll('div.variable input')[1]).to.have.value('r');
  });

  it('should remove existing variable', function () {
    let variables = document.querySelectorAll('div.variable');
    expect(variables).to.have.length(2);
    variables[0].querySelector('.control-remove').click();
    m.redraw.sync();
    expect(document.querySelectorAll('div.variable')).to.have.length(1);
    expect(document.querySelector('div.variable input')).to.have.value('q');
  });

  it('should update existing variable', function () {
    let variable = document.querySelector('div.variable input');
    variable.value = 'a';
    variable.dispatchEvent(new Event('input', { bubbles: true }));
    m.redraw.sync();
    expect(document.querySelector('th.variable')).to.have.text('a');
  });

  it('should add new expression', function () {
    let expressions = document.querySelectorAll('th.expression');
    expect(expressions).to.have.length(3);
    expressions[0].querySelector('.control-add').click();
    m.redraw.sync();
    expect(document.querySelectorAll('th.expression')).to.have.length(4);
    expect(document.querySelectorAll('th.expression input')[1]).to.have.value('not p');
  });

  it('should remove existing expression', function () {
    let expressions = document.querySelectorAll('th.expression');
    expect(expressions).to.have.length(3);
    expressions[0].querySelector('.control-remove').click();
    m.redraw.sync();
    expect(document.querySelectorAll('th.expression')).to.have.length(2);
    expect(document.querySelector('th.expression input')).to.have.value('p and q');
  });

  it('should update existing expression', function () {
    let expression = document.querySelector('th.expression input');
    expression.value = 'p xor q';
    expression.dispatchEvent(new Event('input', { bubbles: true }));
    m.redraw.sync();
    let values = document.querySelectorAll('td:nth-child(3)');
    expect(values[0]).to.have.text('F');
    expect(values[1]).to.have.text('T');
    expect(values[2]).to.have.text('T');
    expect(values[3]).to.have.text('F');
  });

  it('should open reference sidebar', function () {
    let reference = document.querySelector('#reference');
    expect(reference).not.to.have.class('reference-is-open');
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    expect(reference).to.have.class('reference-is-open');
  });

  it('should close reference sidebar via button', function () {
    let reference = document.querySelector('#reference');
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('img.reference-close-control').click();
    m.redraw.sync();
    expect(reference).not.to.have.class('reference-is-open');
  });

  it('should close reference sidebar via overlay', function () {
    let reference = document.querySelector('#reference');
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    reference.click();
    m.redraw.sync();
    expect(reference).not.to.have.class('reference-is-open');
  });

  it('should add unary example to table when clicked', function () {
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('.feature:nth-of-type(1) .feature-example:nth-of-type(2)').click();
    m.redraw.sync();
    let expression = document.querySelector('.expression:last-child input');
    expect(expression).to.have.value('!p');
  });

  it('should add binary example to table when clicked', function () {
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('.feature:nth-of-type(2) .feature-example:nth-of-type(4)').click();
    m.redraw.sync();
    let expression = document.querySelector('.expression:last-child input');
    expect(expression).to.have.value('p * q');
  });

  it('should add second variable if example requires it', function () {
    let variables = document.querySelectorAll('div.variable');
    variables[1].querySelector('.control-remove').click();
    m.redraw.sync();
    let secondVariable = document.querySelector('div.variable:nth-of-type(2) input');
    expect(secondVariable).to.be.null;
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('.feature:nth-of-type(2) .feature-example:nth-of-type(4)').click();
    m.redraw.sync();
    secondVariable = document.querySelector('div.variable:nth-of-type(2) input');
    expect(secondVariable).to.have.value('q');
  });

  it('should add third variable if example requires it', function () {
    let thirdVariable = document.querySelector('div.variable:nth-of-type(3) input');
    expect(thirdVariable).to.be.null;
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('.feature:nth-of-type(4) .feature-example:nth-of-type(1)').click();
    m.redraw.sync();
    thirdVariable = document.querySelector('div.variable:nth-of-type(3) input');
    expect(thirdVariable).to.have.value('r');
  });

  it('should modify unary example to use variable names defined by user', function () {
    let variables = document.querySelectorAll('div.variable input');
    variables[0].value = 'a';
    variables[0].dispatchEvent(new Event('input', { bubbles: true }));
    m.redraw.sync();
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('.feature:nth-of-type(1) .feature-example:nth-of-type(2)').click();
    m.redraw.sync();
    let expression = document.querySelector('.expression:last-child input');
    expect(expression).to.have.value('!a');
  });

  it('should modify binary example to use variable names defined by user', function () {
    let variables = document.querySelectorAll('div.variable input');
    variables[0].value = 'a';
    variables[1].value = 'b';
    variables[0].dispatchEvent(new Event('input', { bubbles: true }));
    variables[1].dispatchEvent(new Event('input', { bubbles: true }));
    m.redraw.sync();
    document.querySelector('a.reference-open-control').click();
    m.redraw.sync();
    document.querySelector('.feature:nth-of-type(5) .feature-example:nth-of-type(2)').click();
    m.redraw.sync();
    let expression = document.querySelector('.expression:last-child input');
    expect(expression).to.have.value('a ^ b');
  });

});

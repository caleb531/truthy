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

  it('should add new variable', function () {
    var variables = document.querySelectorAll('div.variable');
    expect(variables).to.have.length(2);
    variables[1].querySelector('.control-add').click();
    m.redraw.sync();
    expect(document.querySelectorAll('div.variable')).to.have.length(3);
  });

});

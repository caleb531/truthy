'use strict';

var expect = require('chai').expect;
var App = require('../app/scripts/app');

describe('app', function () {

  it('should initialize app with no arguments', function () {
    var app = new App();
    expect(app).to.have.property('variables');
    expect(app.variables).to.have.length(2);
    expect(app).to.have.property('expressions');
    expect(app.expressions).to.have.length(3);
  });

});

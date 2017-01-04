'use strict';

var expect = require('chai').expect;
var App = require('../app/scripts/app');

describe('app', function () {

  it('should initialize with no arguments', function () {
    var app = new App();
    expect(app).to.have.property('variables');
    expect(app.variables).to.have.length(2);
    expect(app).to.have.property('expressions');
    expect(app.expressions).to.have.length(3);
  });

  it('should initialize with arguments', function () {
    var app = new App({
      variables: {items: [{name: 'a'}, {name: 'b'}, {name: 'c'}]},
      expressions: {items: [{string: 'a xor b'}, {string: 'a nand b'}]}
    });
    expect(app).to.have.property('variables');
    expect(app.variables).to.have.length(3);
    expect(app.variables.items[0]).to.have.property('name', 'a');
    expect(app.variables.items[1]).to.have.property('name', 'b');
    expect(app.variables.items[2]).to.have.property('name', 'c');
    expect(app).to.have.property('expressions');
    expect(app.expressions).to.have.length(2);
    expect(app.expressions.items[0]).to.have.property('string', 'a xor b');
    expect(app.expressions.items[1]).to.have.property('string', 'a nand b');
  });

  it('should serialize to JSON object', function () {
    var appJSON = {
      variables: {items: [{name: 'a'}, {name: 'b'}, {name: 'c'}]},
      expressions: {items: [{string: 'a xor b'}, {string: 'a nand b'}]}
    };
    var app = new App(appJSON);
    expect(app.serialize()).to.deep.equal(appJSON);
  });

});

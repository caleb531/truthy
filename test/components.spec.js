'use strict';

var expect = require('chai').expect;
var m = require('mithril');
var AppComponent = require('../app/scripts/components/app');
var $ = require('jquery');

describe('app UI', function () {

  beforeEach(function () {
    m.mount(document.body, AppComponent);
  });

  afterEach(function () {
    m.mount(document.body, null);
  });

  it('should render app', function () {
      expect($).to.be.ok;
  });

});

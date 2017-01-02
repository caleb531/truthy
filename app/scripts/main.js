'use strict';

var m = require('mithril');
var attachFastClick = require('fastclick');
var App = require('./app');

m.mount(document.querySelector('main'), App.Component);
attachFastClick(document.body);

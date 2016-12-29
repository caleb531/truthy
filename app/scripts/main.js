'use strict';

var m = require('mithril');
var attachFastClick = require('fastclick');
var App = require('./app');

m.mount(document.getElementById('app'), App.Component);
attachFastClick(document.body);

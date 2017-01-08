'use strict';

var m = require('mithril');
var _ = require('underscore');
var App = require('../models/app');
var ReferenceComponent = require('./reference');
var VariableCollectionComponent = require('./variable-collection');
var TableComponent = require('./table');

var AppComponent = {};

AppComponent.controller = function () {
  return {
    app: App.restore(),
    referenceIsOpen: false,
    // Toggle reference sidebar between open/closed state according to the
    // control clicked
    toggleReference: function (ctrl, event) {
      if (event.target.classList.contains('reference-open-control') && !ctrl.referenceIsOpen) {
        ctrl.referenceIsOpen = true;
        event.preventDefault();
      } else if (event.target.classList.contains('reference-close-control') && ctrl.referenceIsOpen) {
        ctrl.referenceIsOpen = false;
        event.preventDefault();
      } else {
        // Stop unnecessary redraws on click, since the click event is bound to
        // the entire #app container
        m.redraw.strategy('none');
      }
    }
  };
};

AppComponent.view = function (ctrl) {
  return m('div#app', {onclick: _.partial(ctrl.toggleReference, ctrl)}, [
    m('span#reference-link.nav-link.nav-link-left',
      m('a[href=#].reference-open-control', 'App Reference')
    ),
    m('span#personal-site-link.nav-link.nav-link-right', [
      'by ', m('a[href=https://calebevans.me/]', 'Caleb Evans')
    ]),
    m('h1', 'Truthy'),
    m(ReferenceComponent, ctrl.referenceIsOpen),
    m('h2', 'Variables'),
    m(VariableCollectionComponent, ctrl.app),
    m('h2', 'Table'),
    m('div.scrollable-container', m(TableComponent, ctrl.app)),
    m('p', [
      'Like Truthy? ',
      m('a[href=https://github.com/caleb531/truthy]', 'Star it on GitHub!')
    ])
  ]);
};

module.exports = AppComponent;

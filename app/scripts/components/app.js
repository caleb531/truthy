'use strict';

var m = require('mithril');
var App = require('../models/app');
var ReferenceComponent = require('./reference');
var VariableCollectionComponent = require('./variable-collection');
var TableComponent = require('./table');

var AppComponent = {};

AppComponent.oninit = function (vnode) {
  var state = vnode.state;
  Object.assign(state, {
    app: App.restore(),
    referenceIsOpen: false,
    // Toggle reference sidebar between open/closed state according to the
    // control clicked
    toggleReference: function (clickEvent) {
      if (clickEvent.target.classList.contains('reference-open-control') && !state.referenceIsOpen) {
        state.referenceIsOpen = true;
        clickEvent.preventDefault();
      } else if (clickEvent.target.classList.contains('reference-close-control') && state.referenceIsOpen) {
        state.referenceIsOpen = false;
        clickEvent.preventDefault();
      } else {
        // Stop unnecessary redraws on click, since the click event is bound to
        // the entire #app container
        clickEvent.redraw = false;
      }
    }
  });
};

AppComponent.view = function (vnode) {
  var state = vnode.state;
  return m('div#app', {onclick: state.toggleReference}, [
    m('span#reference-link.nav-link.nav-link-left',
      m('a[href=#].reference-open-control', 'App Reference')
    ),
    m('span#personal-site-link.nav-link.nav-link-right', [
      'by ', m('a[href=https://calebevans.me/]', 'Caleb Evans')
    ]),
    m('h1', 'Truthy'),
    m(ReferenceComponent, {referenceIsOpen: state.referenceIsOpen}),
    m('h2', 'Variables'),
    m(VariableCollectionComponent, state),
    m('h2', 'Table'),
    m('div.scrollable-container', m(TableComponent, state)),
    m('p', [
      'Like Truthy? ',
      m('a[href=https://github.com/caleb531/truthy]', 'Star it on GitHub!')
    ])
  ]);
};

module.exports = AppComponent;

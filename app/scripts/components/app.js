import m from 'mithril';
import App from '../models/app.js';
import ReferenceComponent from './reference.js';
import VariableCollectionComponent from './variable-collection.js';
import TableComponent from './table.js';

// The entire application UI, including static and dynamic app elements
class AppComponent {

  oninit() {
    this.app = App.restore();
    this.referenceIsOpen = false;
  }

  // Toggle reference sidebar between open/closed state according to the
  // control clicked
  toggleReference(clickEvent) {
    if (clickEvent.target.classList.contains('reference-open-control') && !this.referenceIsOpen) {
      this.referenceIsOpen = true;
      clickEvent.preventDefault();
    } else if (clickEvent.target.classList.contains('reference-close-control') && this.referenceIsOpen) {
      this.referenceIsOpen = false;
      clickEvent.preventDefault();
    } else {
      // Stop unnecessary redraws on click, since the click event is bound to
      // the entire #app container
      clickEvent.redraw = false;
    }
  }

  view(vnode) {
    var state = vnode.state;
    return m('div#app', {
      onclick: (clickEvent) => this.toggleReference(clickEvent)
    }, [
      m('span#reference-link.nav-link.nav-link-left',
        m('a[href=#].reference-open-control', 'App Reference')
      ),
      m('span#personal-site-link.nav-link.nav-link-right', [
        'by ', m('a[href=https://calebevans.me/]', 'Caleb Evans')
      ]),
      m('h1', 'Truthy'),
      m(ReferenceComponent, {referenceIsOpen: this.referenceIsOpen}),
      m('h2', 'Variables'),
      m(VariableCollectionComponent, {app: state.app}),
      m('h2', 'Table'),
      m('div.scrollable-container', m(TableComponent, {app: state.app})),
      m('p', [
        'Like Truthy? ',
        m('a[href=https://github.com/caleb531/truthy]', 'Check it out on GitHub!')
      ])
    ]);
  }

}

export default AppComponent;

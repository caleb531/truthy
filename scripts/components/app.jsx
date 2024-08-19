import App from '../models/app.js';
import ReferenceComponent from './reference.jsx';
import TableComponent from './table.jsx';
import VariableCollectionComponent from './variable-collection.jsx';

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
    } else if (
      clickEvent.target.classList.contains('reference-close-control') &&
      this.referenceIsOpen
    ) {
      this.referenceIsOpen = false;
      clickEvent.preventDefault();
    } else {
      // Stop unnecessary redraws on click, since the click event is bound to
      // the entire #app container
      clickEvent.redraw = false;
    }
  }

  view() {
    return (
      <div id="app" onclick={(clickEvent) => this.toggleReference(clickEvent)}>
        <span id="reference-link" className="nav-link nav-link-left">
          <a href="#" className="reference-open-control">
            App Reference
          </a>
        </span>
        <span id="personal-site-link" className="nav-link nav-link-right">
          by <a href="https://calebevans.me/">Caleb Evans</a>
        </span>
        <h1>Truthy</h1>
        <ReferenceComponent app={this.app} referenceIsOpen={this.referenceIsOpen} />
        <h2>Variables</h2>
        <VariableCollectionComponent app={this.app} />
        <h2>Table</h2>
        <div className="scrollable-container">
          <TableComponent app={this.app} />
        </div>
        <p>
          Like Truthy? <a href="https://github.com/caleb531/truthy">Check it out on GitHub!</a>
        </p>
      </div>
    );
  }
}

export default AppComponent;

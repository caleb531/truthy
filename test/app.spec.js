import { expect } from 'chai';
import App from '../app/scripts/models/app.js';

describe('app', function () {

  it('should initialize with no arguments', function () {
    let app = new App();
    expect(app).to.have.property('variables');
    expect(app.variables).to.have.length(2);
    expect(app).to.have.property('expressions');
    expect(app.expressions).to.have.length(3);
  });

  it('should initialize with arguments', function () {
    let app = new App({
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
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
    let serializedApp = {
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
    };
    let app = new App(serializedApp);
    expect(app.serialize()).to.deep.equal(serializedApp);
  });

  it('should save serialized app to disk', function () {
    let serializedApp = {
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
    };
    let app = new App(serializedApp);
    app.save();
    let restoredAppStr = localStorage.getItem('truthy-v3');
    expect(restoredAppStr).to.be.equal(JSON.stringify(serializedApp));
    localStorage.removeItem('truthy-v3');
  });

  it('should restore serialized app to disk', function () {
    let serializedApp = {
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
    };
    let app = new App(serializedApp);
    app.save();
    let restoredApp = App.restore();
    expect(restoredApp).to.be.ok;
    expect(restoredApp.serialize()).to.deep.equal(serializedApp);
  });

});

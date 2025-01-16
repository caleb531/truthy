import App from '../scripts/models/app.js';

describe('app', () => {
  it('should initialize with no arguments', () => {
    const app = new App();
    expect(app).toHaveProperty('variables');
    expect(app.variables).toHaveLength(2);
    expect(app).toHaveProperty('expressions');
    expect(app.expressions).toHaveLength(3);
  });

  it('should initialize with arguments', () => {
    const app = new App({
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
    });
    expect(app).toHaveProperty('variables');
    expect(app.variables).toHaveLength(3);
    expect(app.variables.items[0]).toHaveProperty('name', 'a');
    expect(app.variables.items[1]).toHaveProperty('name', 'b');
    expect(app.variables.items[2]).toHaveProperty('name', 'c');
    expect(app).toHaveProperty('expressions');
    expect(app.expressions).toHaveLength(2);
    expect(app.expressions.items[0]).toHaveProperty('string', 'a xor b');
    expect(app.expressions.items[1]).toHaveProperty('string', 'a nand b');
  });

  it('should serialize to JSON object', () => {
    const serializedApp = {
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
    };
    const app = new App(serializedApp);
    expect(app.serialize()).toEqual(serializedApp);
  });

  it('should save serialized app to disk', () => {
    const serializedApp = {
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
    };
    const app = new App(serializedApp);
    app.save();
    const restoredAppStr = localStorage.getItem('truthy-v3');
    expect(restoredAppStr).toEqual(JSON.stringify(serializedApp));
    localStorage.removeItem('truthy-v3');
  });

  it('should restore serialized app to disk', () => {
    const serializedApp = {
      variables: { items: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
      expressions: { items: [{ string: 'a xor b' }, { string: 'a nand b' }] }
    };
    const app = new App(serializedApp);
    app.save();
    const restoredApp = App.restore();
    expect(restoredApp).toBeTruthy();
    expect(restoredApp.serialize()).toEqual(serializedApp);
  });
});

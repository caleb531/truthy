import Variable from '../app/scripts/models/variable.js';

describe('variable', function () {

  it('should initialize with unmodified name', function () {
    let variable = new Variable({
      name: 'g'
    });
    expect(variable).toHaveProperty('name', 'g');
  });

  it('should serialize to a JSON object', function () {
    let serializedVariable = { name: 'h' };
    let variable = new Variable(serializedVariable);
    expect(variable.serialize()).toEqual(serializedVariable);
  });

});

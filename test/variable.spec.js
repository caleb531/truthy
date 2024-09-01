import Variable from '../scripts/models/variable.js';

describe('variable', () => {
  it('should initialize with unmodified name', () => {
    let variable = new Variable({
      name: 'g'
    });
    expect(variable).toHaveProperty('name', 'g');
  });

  it('should serialize to a JSON object', () => {
    let serializedVariable = { name: 'h' };
    let variable = new Variable(serializedVariable);
    expect(variable.serialize()).toEqual(serializedVariable);
  });
});

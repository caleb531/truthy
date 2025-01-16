import Variable from '../scripts/models/variable.js';

describe('variable', () => {
  it('should initialize with unmodified name', () => {
    const variable = new Variable({
      name: 'g'
    });
    expect(variable).toHaveProperty('name', 'g');
  });

  it('should serialize to a JSON object', () => {
    const serializedVariable = { name: 'h' };
    const variable = new Variable(serializedVariable);
    expect(variable.serialize()).toEqual(serializedVariable);
  });
});

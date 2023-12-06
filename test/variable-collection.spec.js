import VariableCollection from '../scripts/models/variable-collection.js';
import Variable from '../scripts/models/variable.js';

describe('variable collection', () => {

  it('should initialize with list of variables', () => {
    let variables = new VariableCollection({
      items: [{ name: 'u' }, { name: 'v' }]
    });
    expect(variables).toHaveProperty('items');
    expect(variables.items).toHaveLength(2);
    variables.items.forEach((variable) => {
      expect(variable).toBeInstanceOf(Variable);
    });
  });

  it('should map variable permutations', () => {
    let expectedPermutations = [
      { s: false, t: false },
      { s: false, t: true },
      { s: true, t: false },
      { s: true, t: true }
    ];
    let variables = new VariableCollection({
      items: [{ name: 's' }, { name: 't' }]
    });
    let actualPermutations = variables.mapPermutations((varValues) => {
      return Object.assign({}, varValues);
    });
    expect(actualPermutations[0]).toEqual(expectedPermutations[0]);
    expect(actualPermutations[1]).toEqual(expectedPermutations[1]);
    expect(actualPermutations[2]).toEqual(expectedPermutations[2]);
    expect(actualPermutations[3]).toEqual(expectedPermutations[3]);
  });

  describe('getNextVariableName', () => {

    let variables = new VariableCollection({
      items: [{ name: 'q' }, { name: 's' }, { name: 'z' }, { name: 'a' }]
    });

    it('should find names in-between existing variables', () => {
      expect(variables.getNextVariableName(variables.items[0])).toEqual('r');
    });
    it('should find next available name without wrapping', () => {
      expect(variables.getNextVariableName(variables.items[1])).toEqual('t');
    });
    it('should wrap around to next available name as needed', () => {
      expect(variables.getNextVariableName(variables.items[2])).toEqual('b');
    });

  });

});

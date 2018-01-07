import { expect } from 'chai';
import Variable from '../app/scripts/models/variable.js';

describe('variable', () => {

  it('should initialize with unmodified name', () => {
    let variable = new Variable({
      name: 'g'
    });
    expect(variable).to.have.property('name', 'g');
  });

  it('should serialize to a JSON object', () => {
    let serializedVariable = {name: 'h'};
    let variable = new Variable(serializedVariable);
    expect(variable.serialize()).to.deep.equal(serializedVariable);
  });

});

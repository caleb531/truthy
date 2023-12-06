import { times, fromPairs } from 'lodash-es';
import Collection from './collection.js';
import Variable from './variable.js';

// An ordered sequence of variables; every variable collection inherits from the
// base Collection model
class VariableCollection extends Collection {

  constructor({ items }) {
    super({
      SubCollectionItem: Variable,
      items: items
    });
  }

  // Return true if a variable with the given name does not exist in the
  // collection; otherwise, return false
  checkNameAvailability(variableName) {
    return !this.items.some((variable) => variable.name === variableName);
  }

  // Transform all possible permutations of true/false values for this collection
  // of variables using the provided callback
  mapPermutations(callback) {
    let variables = this;
    // An object where each key is a variable name and each value is a boolean
    // representing the current value of that variable
    let currentVarValues = fromPairs(variables.map((variable) => {
      // Initialize all variable values to false
      return [variable.name, false];
    }));
    // If n corresponds to the number of variables, then there will always be 2^n
    // permutations to generate
    return times(Math.pow(2, variables.length), (rowIndex) => {
      variables.forEach((variable, varIndex) => {
        // Alternate variable values as needed (but not on the first permutation)
        if (rowIndex % Math.pow(2, variables.length - varIndex - 1) === 0 && rowIndex !== 0) {
          currentVarValues[variable.name] = !currentVarValues[variable.name];
        }
      });
      return callback(currentVarValues);
    });
  }

  // Get the next available variable name for a new variable (to insert next to
  // the given base variable)
  getNextVariableName(baseVariable) {
    // Create a list of variable names already in use
    let variableCharCodes = this.map((variable) => variable.name.charCodeAt(0));
    // Look for the next letter that isn't already in use
    let nextVarCharCode = baseVariable.name.charCodeAt(0);
    do {
      nextVarCharCode += 1;
      // Wrap variable name around alphabet if necessary (e.g. 'z' wraps around to
      // 'a')
      if (nextVarCharCode === 91 || nextVarCharCode === 123) {
        nextVarCharCode = nextVarCharCode - 26;
      }
    } while (variableCharCodes.indexOf(nextVarCharCode) !== -1);
    return String.fromCharCode(nextVarCharCode);
  }

}

export default VariableCollection;

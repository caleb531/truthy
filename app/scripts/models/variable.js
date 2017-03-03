'use strict';

// A variable used in an expression string
function Variable(args) {
  this.name = args.name;
}

Variable.prototype.serialize = function () {
  return {
    name: this.name
  };
};

module.exports = Variable;

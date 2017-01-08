'use strict';

function Variable(args) {
  this.name = args.name;
}

Variable.prototype.serialize = function () {
  return {
    name: this.name
  };
};

module.exports = Variable;

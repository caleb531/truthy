'use strict';

function Variable(args) {
  this.name = args.name;
}
Variable.validNamePattern = /^[A-Za-z]$/;

module.exports = Variable;

'use strict';

var peg = require('pegjs');

class PegJsPlugin {

  constructor(config) {
    this.config = config.plugins.pegjs;
  }

  compile(file) {
    var parser;
    try {
      parser = peg.generate(file.data, this.config);
    } catch(error) {
      if (error instanceof peg.parser.SyntaxError) {
        error.message = `${error.message} at ${error.location.start.line}:${error.location.start.column}`;
      }
      return Promise.reject(error);
    }
    return Promise.resolve({data: parser});
  }

}

// brunchPlugin must be set to true for all Brunch plugins
PegJsPlugin.prototype.brunchPlugin = true;
// The type of file to generate
PegJsPlugin.prototype.type = "javascript";
// The extension for files to process
PegJsPlugin.prototype.extension = "pegjs";

module.exports = PegJsPlugin;

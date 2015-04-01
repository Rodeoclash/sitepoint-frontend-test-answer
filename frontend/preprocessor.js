var ReactTools = require('react-tools');
var babel = require("babel-core");

module.exports = {
  process: function(src, path) {

    if (path.indexOf("node_modules") === -1 && babel.canCompile(path)) {
      src = babel.transform(src, { filename: path }).code;
    }

    if (path.match(/\.jsx?$/)) {
      src = ReactTools.transform('/** @jsx React.DOM */' + src);
    };
    return src;
  }
};
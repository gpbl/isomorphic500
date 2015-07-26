module.exports = function(src, map) {
  if (this.cacheable) { this.cacheable(); }

  if (/StyleSheet\.create/.exec(src)) {
    var addition = [
      '(function() {',
      '  if (module.hot) {',
      '    var list = [["ReactStyles", StyleSheet.compile().css, ""]];',
      '    require("style-loader/addStyles")(list);',
      '    module.hot.accept();',
      '    module.hot.dispose(function() {',
      '      StyleSheet.destroy(styles);',
      '    });',
      '  }',
      '})();'
    ].join('\n');
    src = src + '\n' + addition;
  }

  this.callback(null, src, map);
}

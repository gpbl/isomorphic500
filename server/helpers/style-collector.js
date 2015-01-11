exports.collect = function(fn) {
  var stuff = [];
  function add(css) {
    stuff.push(css);
  }
  var old = exports.add;
  exports.add = add;
  fn();
  exports.add = old;
  return stuff.join("\n");
}

exports.add = function() {}
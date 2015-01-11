// From: https://github.com/webpack/react-webpack-server-side-example
module.exports = function() {};
module.exports.pitch = function(req) {
  this.cacheable();
  return "require(" + JSON.stringify(require.resolve("./style-collector")) + ").add(require(" + JSON.stringify("!!" + req) + "));\n" +
    "delete require.cache[module.id];";
}
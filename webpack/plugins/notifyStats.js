// helpers for logging / notifying webpack stats 
function notifyError(error) {
  console.log('\x07', error);
}

function notifyWarning(warning) {
  console.log(warning);
}

module.exports = function (stats) {
  var json = stats.toJson();
  if (json.errors.length > 0)
    json.errors.forEach(notifyError);
  else if (json.warnings.length > 0)
    json.warnings.forEach(notifyWarning);
  else
    // just output the stats
    console.log('\n' + stats.toString({
      chunks: false,
      colors: true
    }));
};
// helpers for logging / notifying webpack stats 
var chalk = require('chalk');
var notifier = require('node-notifier');

function notifyError(error) {
  error = error.split('\n');
  var title = error[error.length - 1];
  var message = error[1];
  console.log(chalk.red(title));
  console.log('   ' + chalk.white(message));
  notifier.notify({
    title: title,
    message: message,
    sound: true
  });
}

function notifyWarning(warning) {
  warning = warning.split('\n');
  var title = warning[warning.length - 1];
  var message = warning[1];
  console.log(chalk.orange(title));
  console.log('   ' + chalk.white(message));
  notifier.notify({
    title: title,
    message: message
  });
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
'use strict';

var cachebuster = {};

// Remove the hash from cache-busted resources
// Must be called before express.static()
cachebuster.remove = function (req, res, next) {
  var hash = req.params[1];
  req._hashedUrl = req.url;
  req.url = req.url.replace(hash, '');
  next();
};

// Restore the original url
// Must be called after express.static()
cachebuster.restore = function (req, res, next) {
  req.url = req._hashedUrl;
  delete req._hashedUrl;
  next();
};

// Regexp for detecting busted files (e.g. /images/myimage.<hash>.png)
cachebuster.path = /\/(static|images)\/.*(\.[\w\d]{8})\..*$/;

module.exports = cachebuster;
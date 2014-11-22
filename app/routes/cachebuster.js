'use strict';

var cachebuster = {};

// Remove the hash from cache-busted resources
cachebuster.remove =function (req, res, next) {
    var hash = req.params[1];
    req._hashedUrl = req.url;
    req.url = req.url.replace(hash, '');
    next();
};

// Restore the original url
cachebuster.restore = function(req, res, next) {
    req.url = req._hashedUrl;
    delete req._hashedUrl;
    next();
};

cachebuster.path = /\/(js|css|images)\/.*(\.[\w\d]{8})\..*$/;

module.exports = cachebuster;
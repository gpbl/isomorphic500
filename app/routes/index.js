"use strict";

var express = require('express');
var router = express.Router();
var React = require('React');
var Root = require('../components/Root.jsx');

/* GET home page. */
router.get('/', function (req, res) {

	var rootElement = React.createElement(Root, {
		title: "Home page",
		greetings: 'Hello, Earthling!'
	});

	res.render('page', {
		rootElementAsString: React.renderToString(rootElement),
		props: rootElement.props
	});
});

module.exports = router;
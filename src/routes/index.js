var express = require('express');
var router = express.Router();
var React = require('React');
var Page = require('../components/Page.jsx');

/* GET home page. */
router.get('/', function (req, res) {

	var pageElement = React.createElement(Page, {
		title: "Home page",
		greetings: "Hello, Earthling!"
	});

	res.render('page', {
		pageElementAsString: React.renderToString(pageElement),
		props: pageElement.props
	});
});

module.exports = router;
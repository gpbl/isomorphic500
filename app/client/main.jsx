/* global props */
"use strict";

var React = require("react");
var Page = require('../components/Page.jsx');
React.render(
		// `props` is a global var used to initialize the component
		// on the first call, when react is already mounted server-side
		// it is set in the express routes and included in the views templates
    <Page {...props} />,
    document.getElementById('mountNode')
);